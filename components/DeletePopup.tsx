"use client";

import React from "react";

interface DeletePopupProps {
  isOpen : boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeletePopup({
  isOpen,
  title = "Delete Item?",
  message = "Are you sure you want to delete this? This action cannot be undone.",
  onConfirm,
  onCancel,
}: DeletePopupProps) {

    if(!isOpen){
        return;
   }
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-sm rounded-xl shadow-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-red-600">{title}</h2>

        <p className="text-sm text-gray-700">{message}</p>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
