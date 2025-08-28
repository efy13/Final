"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BasicTable } from "@/Featured/common/BasicTable";
import { CommonDialog } from "@/Featured/common/Dialog";
import { getAPi, postApi, deleteAPiWithParams } from "@/http/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { UploadIcon } from "lucide-react";

import React, { useState } from "react";
import * as yup from "yup";

const BlogList = () => {
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editBlog, setEditBlog] = useState<any>(null);

  // Blogları backend'den al
  const { data: blogsData, isLoading, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => getAPi("/blogs"),
  });

  const blogs = blogsData?.data || [];

  const {
    mutate: createMutate,
    isLoading: createIsLoading,
    isError: createIsError,
    error: createError,
  } = useMutation({
    mutationKey: ["createBlog"],
    mutationFn: async (data: any) => postApi("/blog/create", data),
    onSuccess: () => {
      formik.resetForm();
      refetch(); // Blogları yeniden yükle
      setOpenAddDialog(false);
    },
  });

  const {
    mutate: editMutate,
    isLoading: editIsLoading,
    isError: editIsError,
    error: editError,
  } = useMutation({
    mutationKey: ["editBlog"],
    mutationFn: async (data: any) =>
      postApi(`/blog/update/${editBlog?._id}`, data),
    onSuccess: () => {
      refetch(); // Blogları yeniden yükle
      setOpenEditDialog(false);
      setEditBlog(null);
    },
  });

  const {
    mutate: deleteMutate,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
    error: deleteError,
  } = useMutation({
    mutationKey: ["deleteBlog"],
    mutationFn: async (id: string) => deleteAPiWithParams(`/blog/delete/${id}`),
    onSuccess: () => {
      refetch(); // Blogları yeniden yükle
    },
  });

  const columns = ["id", "title", "image", "createdAt", "content", "actions"];

  const rows =
    blogs &&
    blogs.map((item: any) => ({
      id: item?._id,
      title: item?.title,
      image: (
        <div>
          <img
            src={item?.imageUrl}
            alt={item?.title}
            className="w-16 h-16 object-cover rounded-md"
          />
        </div>
      ),
      createdAt: new Date(item?.createdAt).toLocaleDateString(),
      content: (
        <div className="line-clamp-2 max-w-xs break-words">{item?.content}</div>
      ),
      actions: (
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            onClick={() => {
              setEditBlog(item);
              setOpenEditDialog(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => deleteMutate(item._id)}
            disabled={deleteIsLoading}
          >
            {deleteIsLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      ),
    }));

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      imageUrl: "" as string | File,
    },
    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      content: yup.string().required("Content is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values?.title ?? "");
      formData.append("content", values?.content ?? "");
      if (values.imageUrl && typeof values.imageUrl !== "string") {
        formData.append("file", values.imageUrl);
      }
      createMutate(formData);
    },
  });

  const editFormik = useFormik({
    initialValues: {
      title: editBlog?.title || "",
      content: editBlog?.content || "",
      imageUrl: "" as string | File,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      content: yup.string().required("Content is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values?.title ?? "");
      formData.append("content", values?.content ?? "");
      if (values.imageUrl && typeof values.imageUrl !== "string") {
        formData.append("file", values.imageUrl);
      }
      editMutate(formData);
    },
  });

  return (
    <div>
      <div className="flex items-center my-5 justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
        <Button onClick={() => setOpenAddDialog(true)}>Add Blog</Button>
      </div>
      <BasicTable cols={columns} rows={rows} isLoading={isLoading} />
      {openAddDialog && (
        <CommonDialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          title="Add Blog"
          desc="Add a new blog"
        >
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            {createIsError && (
              <div className="bg-red-100 text-red-500 rounded-2xl p-4 mb-4">
                {(createError as any)?.message || "Error creating blog."}
              </div>
            )}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="mb-2" htmlFor="title">
                  Title
                </Label>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  name="title"
                  type="text"
                  placeholder="Enter the blog title"
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-sm mt-1 font-medium text-red-500">
                    {formik.errors.title}
                  </div>
                ) : null}
              </div>
              <div>
                <Label className="mb-2" htmlFor="content">
                  Content
                </Label>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.content}
                  name="content"
                  type="text"
                  placeholder="Enter the blog content"
                />
                {formik.touched.content && formik.errors.content ? (
                  <div className="text-sm mt-1 font-medium text-red-500">
                    {formik.errors.content}
                  </div>
                ) : null}
              </div>
              <div>
                <Label className="mb-2" htmlFor="imageUrl">
                  Upload Image
                </Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadIcon className="w-10 h-10 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
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
              </div>
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
            setEditBlog(null);
          }}
          title="Edit Blog"
          desc="Edit the selected blog"
        >
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              editFormik.handleSubmit();
            }}
          >
            {editIsError && (
              <div className="bg-red-100 text-red-500 rounded-2xl p-4 mb-4">
                {(editError as any)?.message || "Error updating blog."}
              </div>
            )}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="mb-2" htmlFor="title">
                  Title
                </Label>
                <Input
                  onChange={editFormik.handleChange}
                  value={editFormik.values.title}
                  name="title"
                  type="text"
                  placeholder="Enter the blog title"
                />
                {editFormik.touched.title && editFormik.errors.title ? (
                  <div className="text-sm mt-1 font-medium text-red-500">
                    {editFormik.errors.title}
                  </div>
                ) : null}
              </div>
              <div>
                <Label className="mb-2" htmlFor="content">
                  Content
                </Label>
                <Input
                  onChange={editFormik.handleChange}
                  value={editFormik.values.content}
                  name="content"
                  type="text"
                  placeholder="Enter the blog content"
                />
                {editFormik.touched.content && editFormik.errors.content ? (
                  <div className="text-sm mt-1 font-medium text-red-500">
                    {editFormik.errors.content}
                  </div>
                ) : null}
              </div>
              <div>
                <Label className="mb-2" htmlFor="imageUrl">
                  Upload Image
                </Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file-edit"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadIcon className="w-10 h-10 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file-edit"
                      type="file"
                      className="hidden"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          editFormik.setFieldValue("imageUrl", file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
            <Button
              disabled={editIsLoading}
              className="my-4 w-full"
              type="submit"
            >
              {editIsLoading ? "Updating..." : "Update"}
            </Button>
          </form>
        </CommonDialog>
      )}
    </div>
  );
};

export default BlogList;