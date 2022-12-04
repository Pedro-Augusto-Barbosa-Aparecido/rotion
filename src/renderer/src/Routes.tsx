import { Router, Route } from "electron-router-dom";
import { BlankPage } from "./pages/blank";
import { Document } from "./pages/document";
import { Default } from "./pages/layouts/default";

export function AppRoutes() {
  return (
    <Router
      main={
        <Route path="/" element={<Default />}>
          <Route path="/" element={<BlankPage />} />
          <Route path="/documents/:id" element={<Document />} />
        </Route>
      }
    />
  );
}
