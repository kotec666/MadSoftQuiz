import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./routes/home/Home.tsx";
import Test from "./routes/test/Test.tsx";
import TestEnded from "./routes/test/components/TestEnded.tsx";
import {TestStatus} from "./types/enums/test.ts";
// import CreateTest from "./routes/create-test/CreateTest.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "tests/:testId",
        element: <Test />,
    },
    {
        path: "/test-failed-timed-out/:testId",
        element: <TestEnded reason={TestStatus.TIMED_OUT} />,
    },
    {
        path: "/test-finished/:testId",
        element: <TestEnded reason={TestStatus.TEST_SUCCESS} />,
    },
    // {
    //     path: "/create-test",
    //     element: <CreateTest />,
    // },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
