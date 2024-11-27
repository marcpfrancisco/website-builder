"use client";

import Blocks from "@/components/Blocks";
import Editor from "@/components/Editor";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import { EditorProvider } from "@/context/EditorContext";
import { useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleBlocks = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <EditorProvider>
      <div className="h-screen flex flex-col bg-gray-100 font-sans text-gray-900">
        <Navbar toggleSidebar={toggleBlocks} />

        <div className="flex overflow-hidden">
          {/* Blocks (Sidebar) on the left */}
          <Blocks onClose={() => setIsVisible(false)} isVisible={isVisible} />

          <main className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <Editor />
          </main>

          {/* Styles and Layer Manager */}
          <RightSidebar />
        </div>
      </div>
    </EditorProvider>
  );
}