"use client";
import React, { useEffect } from "react";

const Commands = () => {
  useEffect(() => {
    const runOnWord = async (text: string) => {
      try {
        await Word.run(async (context) => {
          context.document.body.insertParagraph(text, Word.InsertLocation.end);
          await context.sync();
        });
      } catch (error) {
        console.log(error);
      }
    };

    const writeValue = async (event: Office.AddinCommands.Event) => {
      await runOnWord("ExecuteFunction works. Button ID=" + event.source.id);
      // Calling event.completed is required. event.completed lets the platform know that processing has completed.
      event.completed();
    };

    Office.onReady(() => {
      Office.actions.associate("writeValue", writeValue);
    });
  }, []);

  return <div />;
};

export default Commands;
