import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./app/login/page.tsx";
import Admin from "./app/admin/page.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Workbench from "./app/workbench/index.tsx";
import TalkLibrary from "./app/talkLibrary/index.tsx";
import PeopleManagement from "./app/peopleManagement/index.tsx";
import CustomerChat from "./app/customerChat/index.tsx";
import "./wasmTypes.d.ts";
import "./wasm_exec.js";
import ChatHistory from "./app/chatHistory/page.tsx";
import List from "./app/list/index.tsx";
import "./i18n.ts";
import "./indexedDB.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />}>
          <Route path="workbench" element={<Workbench />}></Route>
          <Route path="talkLibrary" element={<TalkLibrary />}></Route>
          <Route path="peopleManagement" element={<PeopleManagement />}></Route>
          <Route path="customerChat" element={<CustomerChat />}></Route>
          <Route path="virtualList" element={<ChatHistory />} />
          <Route path="list" element={<List />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
