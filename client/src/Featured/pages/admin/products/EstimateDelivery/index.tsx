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

const EstimateDeliveryList = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editDelivery, setEditDelivery] = useState<any>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["EstimateDeliveries"],
    queryFn: async () => getAPi("/products/estimate-deliveries"),
  });

  const {
    mutate,
    isPending,
    isError: createIsErr,
    error: createErr,
  } = useMutation({
    mutationKey: ["CreateEstimateDelivery"],
    mutationFn: async (data: any) =>
      postApi("/products/create/estimate-delivery", data),
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
    mutationKey: ["EditEstimateDelivery"],
    mutationFn: async (data: any) =>
      postApi(`/products/update/estimate-delivery/${editDelivery?._id}`, data),
    onSuccess: () => {
      editFormik.resetForm();
      refetch();
      setOpenEditDialog(false);
      setEditDelivery(null);
    },
  });

  const {
    mutate: deleteMutate,
    isPending: deletePending,
    isError: deleteIsErr,
    error: deleteErr,
  } = useMutation({
    mutationKey: ["DeleteEstimateDelivery"],
    mutationFn: async (id: string) =>
      deleteAPiWithParams("/products/delete/estimate-delivery", id),
    onSuccess: () => {
      refetch();
    },
  });

  const columns = ["id", "estimateDelivery", "actions"];

  const rows =
    data &&
    data?.data?.map((item: any) => ({
      id: item?._id,
      estimateDelivery: item?.estimateDelivery,
      actions: (
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            onClick={() => {
              setEditDelivery(item);
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
    initialValues: { estimateDelivery: "" },
    validationSchema: yup.object({
      estimateDelivery: yup.string().required("Estimate delivery is required"),
    }),
    onSubmit: async (values) => {
      mutate({ estimateDelivery: values?.estimateDelivery ?? "" });
    },
  });

  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: { estimateDelivery: editDelivery?.estimateDelivery || "" },
    validationSchema: yup.object({
      estimateDelivery: yup.string().required("Estimate delivery is required"),
    }),
    onSubmit: async (values) => {
      editMutate({ estimateDelivery: values?.estimateDelivery ?? "" });
    },
  });

  return (
    <div>
      <div className="flex items-center my-5 justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Estimate Delivery List
        </h1>
        <Button onClick={() => setOpenAddDialog(true)}>
          Add Estimate Delivery
        </Button>
      </div>
      <BasicTable cols={columns} rows={rows} isLoading={isLoading} />

      {/* Add Dialog */}
      {openAddDialog && (
        <CommonDialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          title="Add Estimate Delivery"
          desc="Tahmini teslimat ekle"
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
            <Label className="mb-2" htmlFor="estimateDelivery">
              Estimate Delivery
            </Label>
            <Input
              onChange={formik.handleChange}
              value={formik.values.estimateDelivery}
              name="estimateDelivery"
              type="text"
              placeholder="e.g. 2-4 days"
            />
            {formik.touched.estimateDelivery &&
            formik.errors.estimateDelivery ? (
              <div className="text-sm mt-1 font-medium text-red-500">
                {formik.errors.estimateDelivery}
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
            setEditDelivery(null);
          }}
          title="Edit Estimate Delivery"
          desc="Tahmini teslimatı düzenle"
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
            <Label className="mb-2" htmlFor="estimateDelivery">
              Estimate Delivery
            </Label>
            <Input
              onChange={editFormik.handleChange}
              value={editFormik.values.estimateDelivery}
              name="estimateDelivery"
              type="text"
              placeholder="e.g. 2-4 days"
            />
            {editFormik.touched.estimateDelivery &&
            editFormik.errors.estimateDelivery ? (
              <div className="text-sm mt-1 font-medium text-red-500">
                {editFormik.errors.estimateDelivery}
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

export default EstimateDeliveryList;
