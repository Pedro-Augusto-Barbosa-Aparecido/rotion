import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Document as IPCDocument } from "@shared/types/ipc";
import { Editor, OnContentUpdatedParams } from "../components/Editor";
// import { ToC } from "../components/ToC";

export function Document() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { data: document, isFetching: isFetchingDocument } = useQuery(
    ["document", id],
    async () => {
      const response = await window.api.fetchDocument({ id: id! });
      return response.data;
    }
  );

  const { mutateAsync: saveDocument } = useMutation(
    async ({ title, content }: OnContentUpdatedParams) => {
      await window.api.saveDocument({
        id: id!,
        title,
        content,
      });
    },
    {
      onSuccess: (_, { title, content }) => {
        queryClient.setQueryData<IPCDocument[]>(["documents"], (documents) => {
          return documents?.map((document) => {
            if (document.id === id) return { ...document, title };
            return document;
          });
        });

        queryClient.setQueryData<IPCDocument>(["document"], (document) => {
          if (document) return { ...document, title };
          return { title, content, id: id! };
        });
      },
    }
  );

  const initialContent = useMemo(() => {
    if (document) {
      return `<h1>${document.title}</h1>${document.content ?? "<p></p>"}`;
    }

    return "";
  }, [document]);

  function handleEditorContentUpdated({
    title,
    content,
  }: OnContentUpdatedParams) {
    saveDocument({
      title,
      content,
    });
  }

  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      {/* <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold text-xs">
          TABLE OF CONTENTS
        </span>

        <ToC.Root>
          <ToC.Link>Back-end</ToC.Link>
          <ToC.Section>
            <ToC.Link>Banco de dados</ToC.Link>
            <ToC.Link>Autenticação</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside> */}

      <section className="flex-1 flex-col items-center">
        {!isFetchingDocument && document && (
          <Editor
            onContentUpdated={handleEditorContentUpdated}
            content={initialContent}
          />
        )}
      </section>
    </main>
  );
}
