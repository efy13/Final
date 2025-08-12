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

const ProductCategoryList = () => {
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editCategory, setEditCategory] = useState<any>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Categories"],
    queryFn: async () => getAPi("/products/categories"),
  });

  const {
    mutate,
    isPending,
    isError: createIsErr,
    error: createErr,
  } = useMutation({
    mutationKey: ["CreateCategory"],
    mutationFn: async (data: any) => postApi("/products/create/category", data),
    onSuccess: () => {
      formik.resetForm();
      refetch();
      setOpenAddCategoryDialog(false);
    },
  });

  const {
    mutate: editMutate,
    isPending: editPending,
    isError: editIsErr,
    error: editErr,
  } = useMutation({
    mutationKey: ["EditCategory"],
    mutationFn: async (data: any) =>
      postApi(`/products/update/category/${editCategory?._id}`, data),
    onSuccess: () => {
      editFormik.resetForm();
      refetch();
      setOpenEditDialog(false);
      setEditCategory(null);
    },
  });

  const {
    mutate: deleteMutate,
    isPending: deletePending,
    isError: deleteIsErr,
    error: deleteErr,
  } = useMutation({
    mutationKey: ["DeleteCategory"],
    mutationFn: async (id: string) =>
      deleteAPiWithParams("/products/delete/category", id),
    onSuccess: () => {
      refetch();
    },
  });

  const columns = ["id", "name", "actions"];

  const rows =
    data &&
    data?.data?.map((item: any) => ({
      id: item?._id,
      name: item?.name,
      actions: (
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            onClick={() => {
              setEditCategory(item);
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
    initialValues: { name: "" },
    validationSchema: yup.object({
      name: yup.string().required("Category name is required"),
    }),
    onSubmit: async (values) => {
      mutate({ name: values?.name ?? "" });
    },
  });

  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: { name: editCategory?.name || "" },
    validationSchema: yup.object({
      name: yup.string().required("Category name is required"),
    }),
    onSubmit: async (values) => {
      editMutate({ name: values?.name ?? "" });
    },
  });

  return (
    <div>
      <div className="flex items-center my-5 justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Product Categories</h1>
        <Button onClick={() => setOpenAddCategoryDialog(true)}>
          Add Category
        </Button>
      </div>
      <BasicTable cols={columns} rows={rows} isLoading={isLoading} />

      {}
      {openAddCategoryDialog && (
        <CommonDialog
          open={openAddCategoryDialog}
          onClose={() => setOpenAddCategoryDialog(false)}
          title="Add Category"
          desc="Kategori ekle"
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
            <Label className="mb-2" htmlFor="name">
              Category name
            </Label>
            <Input
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              type="text"
              placeholder="Enter the category name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-sm mt-1 font-medium text-red-500">
                {formik.errors.name}
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
            setEditCategory(null);
          }}
          title="Edit Category"
          desc="Kategoriyi düzenle"
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
            <Label className="mb-2" htmlFor="name">
              Category name
            </Label>
            <Input
              onChange={editFormik.handleChange}
              value={editFormik.values.name}
              name="name"
              type="text"
              placeholder="Enter the category name"
            />
            {editFormik.touched.name && editFormik.errors.name ? (
              <div className="text-sm mt-1 font-medium text-red-500">
                {editFormik.errors.name}
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

export default ProductCategoryList;
