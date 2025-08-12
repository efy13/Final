"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BasicTable } from "@/Featured/common/BasicTable";
import { CommonDialog } from "@/Featured/common/Dialog";
import { getAPi, postApi, deleteAPiWithParams } from "@/http/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

const ProductDescriptionList = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editDescription, setEditDescription] = useState<any>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Descriptions"],
    queryFn: async () => getAPi("/products/descriptions"),
  });

  const {
    mutate,
    isPending,
    isError: createIsErr,
    error: createErr,
  } = useMutation({
    mutationKey: ["CreateDescription"],
    mutationFn: async (data: any) =>
      postApi("/products/create/description", data),
    onSuccess: () => {
      formik.resetForm();
      refetch();
      setOpenAddDialog(false);
    },
  });

  const {
    mutate: editMutate,
    isPending: editPending,
    isError: editIsErr,
    error: editErr,
  } = useMutation({
    mutationKey: ["EditDescription"],
    mutationFn: async (data: any) =>
      postApi(`/products/update/description/${editDescription?._id}`, data),
    onSuccess: () => {
      editFormik.resetForm();
      refetch();
      setOpenEditDialog(false);
      setEditDescription(null);
    },
  });

  const {
    mutate: deleteMutate,
    isPending: deletePending,
    isError: deleteIsErr,
    error: deleteErr,
  } = useMutation({
    mutationKey: ["DeleteDescription"],
    mutationFn: async (id: string) =>
      deleteAPiWithParams("/products/delete/description", id),
    onSuccess: () => {
      refetch();
    },
  });

  const columns = ["id", "description", "actions"];

  const rows =
    data &&
    data?.data?.map((item: any) => ({
      id: item?._id,
      description: item?.description,
      actions: (
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            onClick={() => {
              setEditDescription(item);
              setOpenEditDialog(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => deleteMutate(item._id)}
            disabled={deletePending}
          >
            Delete
          </Button>
        </div>
      ),
    }));

  const formik = useFormik({
    initialValues: { description: "" },
    validationSchema: yup.object({
      description: yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      mutate({ description: values?.description ?? "" });
    },
  });

  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: { description: editDescription?.description || "" },
    validationSchema: yup.object({
      description: yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      editMutate({ description: values?.description ?? "" });
    },
  });

  return (
    <div>
      <div className="flex items-center my-5 justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Product Descriptions
        </h1>
        <Button onClick={() => setOpenAddDialog(true)}>Add Description</Button>
      </div>
      <BasicTable cols={columns} rows={rows} isLoading={isLoading} />

      {openAddDialog && (
        <CommonDialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          title="Add Description"
          desc="Açıklama ekle"
        >
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            {createIsErr && (
              <div className="bg-red-100 text-red-500 rounded-2xl p-4">
                {createErr?.message}
              </div>
            )}
            <Label className="mb-2" htmlFor="description">
              Description
            </Label>
            <Input
              onChange={formik.handleChange}
              value={formik.values.description}
              name="description"
              type="text"
              placeholder="Enter the description"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-sm mt-1 font-medium text-red-500">
                {formik.errors.description}
              </div>
            ) : null}
            <Button disabled={isPending} className="my-4 w-full" type="submit">
              {isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </CommonDialog>
      )}

      {/* Edit Dialog */}
      {openEditDialog && (
        <CommonDialog
          open={openEditDialog}
          onClose={() => {
            setOpenEditDialog(false);
            setEditDescription(null);
          }}
          title="Edit Description"
          desc="Açıklamayı düzenle"
        >
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              editFormik.handleSubmit();
            }}
          >
            {editIsErr && (
              <div className="bg-red-100 text-red-500 rounded-2xl p-4">
                {editErr?.message}
              </div>
            )}
            <Label className="mb-2" htmlFor="description">
              Description
            </Label>
            <Input
              onChange={editFormik.handleChange}
              value={editFormik.values.description}
              name="description"
              type="text"
              placeholder="Enter the description"
            />
            {editFormik.touched.description && editFormik.errors.description ? (
              <div className="text-sm mt-1 font-medium text-red-500">
                {editFormik.errors.description}
              </div>
            ) : null}
            <Button
              disabled={editPending}
              className="my-4 w-full"
              type="submit"
            >
              {editPending ? "Saving..." : "Save"}
            </Button>
          </form>
        </CommonDialog>
      )}
    </div>
  );
};

export default ProductDescriptionList;
