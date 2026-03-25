import { LotusDecor } from "@/components/LotusDecor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  Loader2,
  LogOut,
  Package,
  Pencil,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, type Product } from "../backend";
import {
  useAddProduct,
  useGetAllProducts,
  useGetFee,
  useModifyProduct,
  useRemoveProduct,
  useSetFee,
} from "../hooks/useQueries";

function UploadProgress({ progress }: { progress: number }) {
  if (progress <= 0 || progress >= 100) return null;
  return (
    <div className="w-full bg-border rounded-full h-1.5">
      <div
        className="bg-primary h-1.5 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("adminAuthenticated") !== "true") {
      navigate({ to: "/admin" });
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  const { data: products = [], isLoading: loadingProducts } =
    useGetAllProducts();
  const { data: fee, isLoading: loadingFee } = useGetFee();

  const setFeeMutation = useSetFee();
  const addProductMutation = useAddProduct();
  const removeProductMutation = useRemoveProduct();
  const modifyProductMutation = useModifyProduct();

  // Fee state
  const [feeInput, setFeeInput] = useState("");
  useEffect(() => {
    if (fee !== undefined) setFeeInput(String(Number(fee)));
  }, [fee]);

  // Add product state
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productContents, setProductContents] = useState("");
  const [productFile, setProductFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editContents, setEditContents] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editProgress, setEditProgress] = useState(0);

  const handleSetFee = async () => {
    const val = Number(feeInput);
    if (Number.isNaN(val) || val < 0) {
      toast.error("Please enter a valid fee amount");
      return;
    }
    try {
      await setFeeMutation.mutateAsync(BigInt(val));
      toast.success("Delivery fee updated!");
    } catch {
      toast.error("Failed to update fee");
    }
  };

  const readFileAsUint8Array = (
    file: File,
    onProgress?: (p: number) => void,
  ): Promise<Uint8Array<ArrayBuffer>> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onprogress = (e) => {
        if (e.lengthComputable && onProgress)
          onProgress(Math.round((e.loaded / e.total) * 50));
      };
      reader.onload = (e) => {
        onProgress?.(80);
        resolve(
          new Uint8Array(
            e.target?.result as ArrayBuffer,
          ) as Uint8Array<ArrayBuffer>,
        );
      };
      reader.onerror = () => reject(new Error("File read failed"));
      reader.readAsArrayBuffer(file);
    });

  const handleAddProduct = async () => {
    if (!productName.trim() || !productPrice || !productFile) {
      toast.error("Please fill in all fields and select an image");
      return;
    }
    const price = Number(productPrice);
    if (Number.isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    try {
      setUploadProgress(10);
      const bytes = await readFileAsUint8Array(productFile, setUploadProgress);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((p) =>
        setUploadProgress(80 + Math.round(p * 0.2)),
      );
      await addProductMutation.mutateAsync({
        name: productName.trim(),
        price: BigInt(price),
        contents: productContents.trim(),
        image: blob,
      });
      setUploadProgress(100);
      toast.success(`"${productName}" added successfully!`);
      setProductName("");
      setProductPrice("");
      setProductContents("");
      setProductFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setTimeout(() => setUploadProgress(0), 1000);
    } catch {
      toast.error("Failed to add product");
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await removeProductMutation.mutateAsync(id);
      toast.success(`"${name}" deleted.`);
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(String(Number(product.price)));
    setEditContents(product.contents);
    setEditFile(null);
    setEditProgress(0);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditFile(null);
    setEditProgress(0);
  };

  const handleSaveEdit = async (product: Product) => {
    const price = Number(editPrice);
    if (!editName.trim() || Number.isNaN(price) || price <= 0) {
      toast.error("Please fill in valid name and price");
      return;
    }
    try {
      let imageBlob = product.image;
      if (editFile) {
        setEditProgress(10);
        const bytes = await readFileAsUint8Array(editFile, setEditProgress);
        imageBlob = ExternalBlob.fromBytes(bytes).withUploadProgress((p) =>
          setEditProgress(80 + Math.round(p * 0.2)),
        );
      }
      await modifyProductMutation.mutateAsync({
        ...product,
        name: editName.trim(),
        price: BigInt(price),
        contents: editContents.trim(),
        image: imageBlob,
      });
      toast.success("Product updated!");
      cancelEdit();
    } catch {
      toast.error("Failed to update product");
      setEditProgress(0);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2
          className="w-8 h-8 animate-spin text-primary"
          data-ocid="admin.loading_state"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-secondary border-b border-accent/30 shadow-md">
        <div className="h-[2px] bg-gradient-to-r from-accent/40 via-accent to-accent/40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-accent" />
            <a href="/" className="flex items-center gap-2">
              <img
                src="/assets/file_00000000dabc7208bcffbe2575fd7f9b-019d23fb-97d7-7222-bf8a-7fe7d7362a59.png"
                alt="Navayata"
                className="h-9 w-auto object-contain"
              />
            </a>
            <span className="text-accent/60 text-sm font-display uppercase tracking-widest">
              Admin
            </span>
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              sessionStorage.removeItem("adminAuthenticated");
              navigate({ to: "/admin" });
            }}
            className="text-secondary-foreground/60 hover:text-accent gap-2 text-xs uppercase tracking-widest"
            data-ocid="admin.secondary_button"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">
            ✦ Admin Panel ✦
          </p>
          <h1 className="font-display text-4xl font-bold text-foreground mt-1">
            Dashboard
          </h1>
          <LotusDecor className="w-44 h-auto mx-auto text-accent/40 mt-2" />
        </div>

        {/* Delivery Fee */}
        <Card className="rounded-none border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-2xl flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Delivery Charges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadingFee ? (
              <Loader2
                className="w-5 h-5 animate-spin text-primary"
                data-ocid="fee.loading_state"
              />
            ) : (
              <div className="flex items-end gap-3">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">
                    Current Delivery Fee (₹)
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-display font-bold text-primary">
                      ₹
                    </span>
                    <Input
                      type="number"
                      value={feeInput}
                      onChange={(e) => setFeeInput(e.target.value)}
                      className="rounded-none w-32 text-lg font-semibold border-border"
                      placeholder="0"
                      data-ocid="fee.input"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSetFee}
                  disabled={setFeeMutation.isPending}
                  className="rounded-none bg-secondary text-accent border border-accent/40 hover:bg-accent hover:text-accent-foreground gap-2 uppercase tracking-widest text-xs"
                  data-ocid="fee.save_button"
                >
                  {setFeeMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Fee
                </Button>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Set to ₹0 for free delivery. Keep under ₹100 for affordability.
            </p>
          </CardContent>
        </Card>

        {/* Add Product */}
        <Card className="rounded-none border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-2xl flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Add New Product
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="p-name">Product Name *</Label>
                <Input
                  id="p-name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Silk Saree"
                  className="rounded-none border-border"
                  data-ocid="product.input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="p-price">Price (₹) *</Label>
                <Input
                  id="p-price"
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="e.g. 499"
                  className="rounded-none border-border"
                  data-ocid="product.input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-desc">Description</Label>
              <Textarea
                id="p-desc"
                value={productContents}
                onChange={(e) => setProductContents(e.target.value)}
                placeholder="Describe the product, material, sizes available..."
                rows={3}
                className="rounded-none border-border resize-none"
                data-ocid="product.textarea"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-image">Product Image *</Label>
              <input
                id="p-image"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setProductFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-muted-foreground file:mr-3 file:py-2 file:px-4 file:rounded-none file:border file:border-accent/40 file:text-xs file:font-medium file:bg-secondary file:text-accent hover:file:bg-accent hover:file:text-accent-foreground cursor-pointer"
                data-ocid="product.upload_button"
              />
              {productFile && (
                <p className="text-xs text-muted-foreground">
                  Selected: {productFile.name}
                </p>
              )}
            </div>
            <UploadProgress progress={uploadProgress} />
            <Button
              onClick={handleAddProduct}
              disabled={addProductMutation.isPending}
              className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 gap-2 uppercase tracking-widest text-xs px-8"
              data-ocid="product.submit_button"
            >
              {addProductMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {addProductMutation.isPending ? "Adding..." : "Add Product"}
            </Button>
          </CardContent>
        </Card>

        {/* Products List */}
        <Card className="rounded-none border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-2xl flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              All Products
              {products.length > 0 && (
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  ({products.length})
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingProducts ? (
              <div
                className="flex items-center gap-2 py-8 justify-center"
                data-ocid="products.loading_state"
              >
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-muted-foreground text-sm">
                  Loading products...
                </span>
              </div>
            ) : products.length === 0 ? (
              <div
                className="py-12 text-center space-y-3"
                data-ocid="products.empty_state"
              >
                <Package className="w-12 h-12 text-muted-foreground/30 mx-auto" />
                <p className="text-muted-foreground">
                  No products yet — add your first product above
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table data-ocid="products.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-display">Image</TableHead>
                      <TableHead className="font-display">Name</TableHead>
                      <TableHead className="font-display">Price</TableHead>
                      <TableHead className="font-display">
                        Description
                      </TableHead>
                      <TableHead className="font-display text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product, idx) => (
                      <TableRow
                        key={product.id}
                        data-ocid={`products.item.${idx + 1}`}
                      >
                        {editingId === product.id ? (
                          <>
                            <TableCell>
                              <div className="space-y-2">
                                <img
                                  src={product.image.getDirectURL()}
                                  alt={product.name}
                                  className="w-14 h-14 object-cover border border-border"
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    setEditFile(e.target.files?.[0] || null)
                                  }
                                  className="block text-xs text-muted-foreground file:mr-2 file:py-1 file:px-2 file:rounded-none file:border file:border-accent/40 file:text-xs file:bg-secondary file:text-accent w-28"
                                  data-ocid={`products.upload_button.${idx + 1}`}
                                />
                                <UploadProgress progress={editProgress} />
                              </div>
                            </TableCell>
                            <TableCell>
                              <Input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="rounded-none border-border text-sm w-36"
                                data-ocid={`products.input.${idx + 1}`}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <span className="text-sm">₹</span>
                                <Input
                                  type="number"
                                  value={editPrice}
                                  onChange={(e) => setEditPrice(e.target.value)}
                                  className="rounded-none border-border text-sm w-24"
                                  data-ocid={`products.input.${idx + 1}`}
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <Textarea
                                value={editContents}
                                onChange={(e) =>
                                  setEditContents(e.target.value)
                                }
                                rows={2}
                                className="rounded-none border-border text-sm resize-none w-48"
                                data-ocid={`products.textarea.${idx + 1}`}
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button
                                  size="sm"
                                  onClick={() => handleSaveEdit(product)}
                                  disabled={modifyProductMutation.isPending}
                                  className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3 text-xs"
                                  data-ocid={`products.save_button.${idx + 1}`}
                                >
                                  {modifyProductMutation.isPending ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  ) : (
                                    <Save className="w-3 h-3" />
                                  )}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={cancelEdit}
                                  className="rounded-none h-8 px-3 text-xs"
                                  data-ocid={`products.cancel_button.${idx + 1}`}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>
                              <img
                                src={product.image.getDirectURL()}
                                alt={product.name}
                                className="w-14 h-14 object-cover border border-border"
                              />
                            </TableCell>
                            <TableCell className="font-display font-semibold">
                              {product.name}
                            </TableCell>
                            <TableCell className="font-semibold text-primary">
                              ₹{Number(product.price)}
                            </TableCell>
                            <TableCell className="text-muted-foreground text-sm max-w-xs truncate">
                              {product.contents || (
                                <span className="italic text-muted-foreground/50">
                                  No description
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => startEdit(product)}
                                  className="rounded-none h-8 px-3 text-xs hover:text-primary"
                                  data-ocid={`products.edit_button.${idx + 1}`}
                                >
                                  <Pencil className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    handleDelete(product.id, product.name)
                                  }
                                  disabled={removeProductMutation.isPending}
                                  className="rounded-none h-8 px-3 text-xs hover:text-destructive"
                                  data-ocid={`products.delete_button.${idx + 1}`}
                                >
                                  {removeProductMutation.isPending ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-3 h-3" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border py-6 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Navayata Admin — Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
