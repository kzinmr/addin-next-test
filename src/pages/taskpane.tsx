import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import Chat from "@/components/Chat";

type PageProps = {
  props?: any
  title?: string;
}

export const getServerSideProps: GetServerSideProps = async (_context: GetServerSidePropsContext) => {
  // return fetch('https://jsonplaceholder.typicode.com/todos/1')
  //   .then(response => response.json())
  //   .then(json => {
  //     console.log(json)
  //     return {
  //       props: json
  //     };
  //   });
  return { props: { title: "Task Pane" } }
}

const TaskPane: NextPage<PageProps> = (props: PageProps) => {
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

export default TaskPane;