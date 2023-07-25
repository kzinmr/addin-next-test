import React from 'react';
import Chat from './Chat';

export type AppProps = {
    title: string;
    isOfficeInitialized: boolean;
};

const App: React.FC<AppProps> = (props) => {
    if (!props.isOfficeInitialized) {
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
