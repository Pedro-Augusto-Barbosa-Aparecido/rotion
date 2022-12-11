import * as Dropdown from "@radix-ui/react-dropdown-menu";

import { File, Trash, Warning } from "phosphor-react";

import { DropdownItem } from "./DropdownItem";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Document } from "@shared/types/ipc";
import { useNavigate } from "react-router-dom";

interface DropdownMenuDocumentProps {
  trigger: React.ReactNode;
  documentId: string;
}

export function DropdownMenuDocument({
  trigger,
  documentId,
}: DropdownMenuDocumentProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: deleteDocument } = useMutation(
    async ({ id }: { id: string }) => {
      await window.api.deleteDocument({ id: documentId });
    },
    {
      onSuccess: (_, { id }) => {
        queryClient.setQueryData<Document[]>(["documents"], (documents) => {
          if (documents)
            return documents.filter((document) => document.id !== id);
          return [];
        });

        navigate("/");
      },
    }
  );

  const { mutateAsync: createChildDocument } = useMutation(
    async ({ parentId }: { parentId: string }) => {
      const response = await window.api.saveChildDocument({ parentId });

      return response.data;
    }
    // {
    //   onSuccess: (document) => {
    //     queryClient.setQueryData<Document[]>(["documents"], (documents) => {
    //       if (documents && documents.length) return [...documents, document];
    //       return [document];
    //     });
    //   },
    // }
  );

  async function handleDeleteDocument() {
    deleteDocument({ id: documentId });
  }

  async function handleCreateChildDocument() {
    createChildDocument({ parentId: documentId });
  }

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>{trigger}</Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content className="w-fit bg-rotion-500 py-2 px-2 rounded-md">
          <DropdownItem
            text={"Delete Parent"}
            icon={<Warning />}
            onClickAction={async () => {}}
            comingSoon
          />
          <DropdownItem
            text={"Delete Document"}
            icon={<Trash />}
            onClickAction={handleDeleteDocument}
          />
          <DropdownItem
            text="Add a Child Document"
            icon={<File />}
            onClickAction={handleCreateChildDocument}
          />
          <Dropdown.Arrow
            className="text-rotion-500 fill-rotion-500"
            height={12}
            width={16}
          />
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}
