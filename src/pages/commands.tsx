'use client'
import React, { useEffect } from "react";

const Commands = () => {
  useEffect(() => {
    Office.onReady(() => {
      Office.actions.associate("writeValue", writeValue);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runOnWord = async (text: string) => {
    try {
      await Word.run(async (context) => {
        context.document.body.insertParagraph(text, Word.InsertLocation.end);
        await context.sync();
      });
    } catch (error) {
      console.log(error);
    };
  }

  const writeValue = async (event: Office.AddinCommands.Event) => {
    await runOnWord("ExecuteFunction works. Button ID=" + event.source.id);
    // Calling event.completed is required. event.completed lets the platform know that processing has completed.
    event.completed();
  }

  return (
    <div />
  );
}

export default Commands;