"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BasicTable } from "@/Featured/common/BasicTable";
import { CommonDialog } from "@/Featured/common/Dialog";
import { getAPi, postApi, deleteAPiWithParams } from "@/http/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { UploadIcon } from "lucide-react";
import React, { useState } from "react";
import * as yup from "yup";

const ProductList = () => {
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => getAPi("/products"),
  });

  const { data: categories } = useQuery({
    queryKey: ["category"],
    queryFn: async () => getAPi("/products/categories"),
  });

  const {
    mutate: createMutate,
    isLoading: createIsLoading,
    isError: createIsError,
    error: createError,
  } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: async (data: any) => postApi("/product/create", data),
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
    mutationKey: ["EditProduct"],
    mutationFn: async (data: any) =>
      postApi(`/products/update/${editProduct?._id}`, data),
    onSuccess: () => {
      editFormik.resetForm();
      refetch();
      setOpenEditDialog(false);
      setEditProduct(null);
    },
  });

  const {
    mutate: deleteMutate,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
    error: deleteError,
  } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async (id: string) =>
      deleteAPiWithParams("/product/delete", id),
    onSuccess: () => {
      refetch();
    },
  });

  const columns = [
    "id",
    "name",
    "price",
    "Desc",
    "image",
    "inStock",
    "categories",
    "actions",
  ];

  const rows =
    data &&
    data?.data?.map((item: any) => ({
      id: item?._id,
      name: item?.name,
      price: item?.price,
      Desc: (
        <div className="line-clamp-2 max-w-xs break-words">
          {item?.description}
        </div>
      ),
      image: (
        <div>
          <img
            src={item?.imageUrl}
            alt={item?.name}
            className="w-16 h-16 object-cover rounded-md"
          />
        </div>
      ),
      inStock: item?.inStock ? "In Stock" : "Out of Stock",
      categories:
        item?.categories?.name || (item?.categories?.[0]?.name ?? "-"),
      actions: (
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            onClick={() => {
              setEditProduct(item);
              setOpenEditDialog(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => deleteMutate(item._id)}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      ),
    }));

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      imageUrl: "" as string | File,
      inStock: true,
      categories: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Product name is required"),
      price: yup
        .number()
        .typeError("Price must be a number")
        .required("Price is required")
        .positive("Price must be positive"),
      description: yup.string().required("Description is required"),
      inStock: yup.boolean(),
      categories: yup.string().required("Category is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values?.name ?? "");
      formData.append("price", values?.price?.toString() ?? "");
      formData.append("description", values?.description ?? "");
      if (values.imageUrl && typeof values.imageUrl !== "string") {
        formData.append("file", values.imageUrl);
      }
      formData.append("inStock", values?.inStock ? "true" : "false");
      formData.append("categories", values?.categories ?? "");
      createMutate(formData);
    },
  });
  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: { name: editProduct?.name || "" },
    validationSchema: yup.object({
      name: yup.string().required("Product name is required"),
    }),
    onSubmit: async (values) => {
      editMutate({ name: values?.name ?? "" });
    },
  });

  return (
    <div>
      <div className="flex items-center my-5 justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Products Lists</h1>
        <Button onClick={() => setOpenAddDialog(true)}>Add Product</Button>
      </div>
      <BasicTable cols={columns} rows={rows} isLoading={isLoading} />
      {openAddDialog && (
        <CommonDialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          title="Add Product"
          desc="Add a new product"
        >
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            {createIsError && (
              <div className="bg-red-100 text-red-500 rounded-2xl p-4 mb-4">
                {(createError as any)?.message || "Error creating product."}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2" htmlFor="name">
                  Name
                </Label>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  name="name"
                  type="text"
                  placeholder="Enter the product name"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-sm mt-1 font-medium text-red-500">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              <div>
                <Label className="mb-2" htmlFor="price">
                  Price
                </Label>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  name="price"
                  type="number"
                  placeholder="Enter the product price"
                />
                {formik.touched.price && formik.errors.price ? (
                  <div className="text-sm mt-1 font-medium text-red-500">
                    {formik.errors.price}
                  </div>
                ) : null}
              </div>
              <div>
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
              </div>
              <div>
                <Label className="mb-2" htmlFor="categories">
                  Select Category
                </Label>
                <Select
                  name="categories"
                  onValueChange={(value) => {
                    formik.setFieldValue("categories", value);
                  }}
                  value={formik.values.categories}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories &&
                        categories?.data?.map((category: any) => (
                          <SelectItem key={category?._id} value={category?._id}>
                            {category?.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {formik.touched.categories && formik.errors.categories ? (
                  <div className="text-sm mt-1 font-medium text-red-500">
                    {formik.errors.categories}
                  </div>
                ) : null}
              </div>
              <div>
                <Label className="mb-2" htmlFor="inStock">
                  In Stock
                </Label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={formik.values.inStock}
                    onChange={(e) =>
                      formik.setFieldValue("inStock", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <span>
                    {formik.values.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon className="w-10 h-10 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        formik.setFieldValue("imageUrl", file);
                      }
                    }}
                  />
                </label>
              </div>
              {formik.values.imageUrl &&
                typeof formik.values.imageUrl !== "string" && (
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="font-medium">
                        {formik.values.imageUrl.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(formik.values.imageUrl.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                )}
            </div>
            <Button
              disabled={createIsLoading}
              className="my-4 w-full"
              type="submit"
            >
              {createIsLoading ? "Creating..." : "Create"}
            </Button>
          </form>
        </CommonDialog>
      )}
      {openEditDialog && (
        <CommonDialog
          open={openEditDialog}
          onClose={() => {
            setOpenEditDialog(false);
            setEditProduct(null);
          }}
          title="Edit Product"
          desc="Update product name"
        >
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              editFormik.handleSubmit();
            }}
          >
            {editIsErr && (
              <div className="bg-red-100 text-red-500 rounded-2xl p-4 mb-4">
                {(editErr as any)?.message || "Error editing product."}
              </div>
            )}
            <div className="mb-4">
              <Label className="mb-2" htmlFor="name">
                Name
              </Label>
              <Input
                name="name"
                type="text"
                value={editFormik.values.name}
                onChange={editFormik.handleChange}
              />
              {editFormik.touched.name && editFormik.errors.name ? (
                <div className="text-sm mt-1 font-medium text-red-500">
                  {editFormik.errors.name}
                </div>
              ) : null}
            </div>
            <Button disabled={editPending} className="w-full" type="submit">
              {editPending ? "Updating..." : "Update"}
            </Button>
          </form>
        </CommonDialog>
      )}
    </div>
  );
};

export default ProductList;
