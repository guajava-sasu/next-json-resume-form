// src/components/EditableList.tsx
"use client";

interface EditableListProps<T> {
  items: T[];
  onAdd: () => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  renderItem?: (item: T, index: number) => React.ReactNode;
}

export default function EditableList<T>({
  items,
  onAdd,
  onEdit,
  onDelete,
  renderItem,
}: EditableListProps<T>) {
  return (
    <div className="space-y-4">
      <button
        onClick={onAdd}
        className="px-4 py-2 mb-4 bg-green-500 text-white rounded"
      >
        Ajouter
      </button>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
            {renderItem ? renderItem(item, index) : <div>{JSON.stringify(item)}</div>}
            <div className="space-x-2">
              <button
                onClick={() => onEdit(index)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
              >
                Modifier
              </button>
              <button
                onClick={() => onDelete(index)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
