"use client";

import { createPageAction } from "@/actions";
import Form from "next/form";
import { useActionState, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "../ui";
import { useToast } from "@/hooks";
import { usePageStore } from "@/store";

const CreatePageDialog = () => {
  const { toast } = useToast();
  const { addPage } = usePageStore();
  const [open, setOpen] = useState(false);
  const [state, action, isPending] = useActionState(
    createPageAction,
    undefined
  );

  useEffect(() => {
    if (state?.page && !isPending) {
      toast({
        title: "Page Created!",
        variant: "success",
      });

      addPage(state.page);
      setOpen(false);
    }
  }, [state, isPending, addPage]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create Page</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Page</DialogTitle>
          <DialogDescription>
            Create new page to update in your Editor Component
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form action={action}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" required className="col-span-3" />
            </div>
            {state?.errors?.name && <p>{state.errors.name}</p>}

            <DialogFooter className="py-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePageDialog;
