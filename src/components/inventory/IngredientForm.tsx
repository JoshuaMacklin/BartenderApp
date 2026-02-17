"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

const UNIT_OPTIONS = ["ml", "cl", "oz", "dashes", "pieces"];
const CATEGORY_OPTIONS = ["spirit", "liqueur", "mixer", "juice", "garnish", "other"];

export function IngredientForm({
  open,
  onOpenChange,
  editingId,
  onClose,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingId: Id<"ingredients"> | null;
  onClose: () => void;
}) {
  const ingredients = useQuery(api.ingredients.list);
  const createIngredient = useMutation(api.ingredients.create);
  const updateIngredient = useMutation(api.ingredients.update);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("cl");
  const [category, setCategory] = useState("spirit");

  const editing = editingId
    ? ingredients?.find((i) => i._id === editingId)
    : null;

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setQuantity(String(editing.quantity));
      setUnit(editing.unit);
      setCategory(editing.category);
    } else {
      setName("");
      setQuantity("");
      setUnit("cl");
      setCategory("spirit");
    }
  }, [editing, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(quantity);
    if (!name.trim() || isNaN(qty) || qty < 0) return;

    if (editingId) {
      await updateIngredient({
        id: editingId,
        name: name.trim(),
        quantity: qty,
        unit,
        category,
      });
    } else {
      await createIngredient({
        name: name.trim(),
        quantity: qty,
        unit,
        category,
      });
    }
    onOpenChange(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingId ? "Edit Ingredient" : "Add Ingredient"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Gin"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              step="0.1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 100"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="unit">Unit</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {UNIT_OPTIONS.map((u) => (
                  <SelectItem key={u} value={u}>
                    {u}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              {editingId ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
