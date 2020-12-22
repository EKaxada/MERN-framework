import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import path from "path";

//modules to render react components to string
import React from "react";
import ReactDOMServer from "react-dom/server";

//modules to match requested URL to frontend route declared in the main component
import StaticRouter from "react-router-dom/StaticRouter";
import MainRouter from "./../client/MainRouter";

//modules to generate CSS styles for frontend components
import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import theme from "./../client/theme";

//comment out before building for production
import devBundle from "./devBundle";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

//comment out before building for production
devBundle.compile(app);

// parse body params and attache them to req.body
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

//mounting routes
app.use("/", userRoutes);
app.use("/", authRoutes);

//catch unathousrized errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

app.get("*", (req, res) => {
  // 1. Generate CSS styles using Material-UI's ServerStyleSheets
  const sheets = new ServerStyleSheets();
  const context = {};
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </StaticRouter>
    )
  );

  // 2. Use renderToString to generate markup which renders components specific to the route requested
  if (context.url) {
    return res.redirect(303, context.url);
  }
  const css = sheets.toString();
  res.status(200).send(
    Template({
      markup: markup,
      css: css,
    })
  );
  // 3. Return template with markup and CSS styles in the response
});

app.get("/", (req, res) => {
  res.status(200).send(Template());
});

/**....export configuration..... */
export default app;
