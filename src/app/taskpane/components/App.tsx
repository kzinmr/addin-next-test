'use client'
import Chat from './Chat';
import React, { useEffect } from "react";

let isOfficeInitialized = false;

export type AppProps = {
    title: string;
};

const App: React.FC<AppProps> = (props) => {

  useEffect(() => {
    Office.onReady(() => {
      isOfficeInitialized = true;
    });
  }, []);

  if (!isOfficeInitialized) {
      // Progress bar to indicate page load
      console.log("Office not initialized")
  }
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <main>
          <Chat />
        </main>
      </div>
    </div>
  );
}

export default App;
