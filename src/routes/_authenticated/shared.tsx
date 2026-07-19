import { createFileRoute } from "@tanstack/react-router";
import { FileText, Users } from "lucide-react";
import { useSharedDocuments } from "@/lib/queries";
import { Card, CardContent } from "@/components/ui/card";
import { SharedDocumentActionsMenu } from "@/components/shared-document-actions-menu";

export const Route = createFileRoute("/_authenticated/shared")({
  component: SharedPage,
});

function SharedPage() {
  const { data, isLoading } = useSharedDocuments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Được chia sẻ với tôi
        </h1>
        <p className="text-muted-foreground mt-1">
          Các tài liệu mà người khác đã chia sẻ tới bạn.
        </p>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="py-12 text-center text-sm">
            Đang tải…
          </CardContent>
        </Card>
      ) : (data ?? []).length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Users className="h-10 w-10 mx-auto text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">
              Chưa có tài liệu được chia sẻ
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {(data ?? []).map((d) => (
            <Card key={d.id}>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
<<<<<<< HEAD
<<<<<<< HEAD
                  <div className="font-medium truncate">{d.title}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {d.description}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Chia sẻ bởi:{" "}
                    <span className="font-medium">{d.sharedBy}</span>
=======
=======
>>>>>>> origin/uichange
                  <div className="font-medium truncate">
                    {d.documentTitle || d.title || "Unnamed Document"}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {d.description || d.folderName || "No description"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Chia sẻ bởi:{" "}
                    <span className="font-medium">
                      {d.ownerUsername || d.ownerEmail || "Unknown"}
                    </span>
<<<<<<< HEAD
>>>>>>> origin/test/share-document-cloudinary
=======
>>>>>>> origin/uichange
                  </div>
                </div>
                <SharedDocumentActionsMenu
                  sharedId={d.id}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  title={d.title}
=======
                  title={d.title ?? ""}
>>>>>>> origin/AI-Study-fix
                  description={d.description ?? undefined}
=======
                  title={d.documentTitle || d.title || "Unnamed Document"}
                  description={d.description || undefined}
>>>>>>> origin/test/share-document-cloudinary
=======
                  title={d.documentTitle || d.title || "Unnamed Document"}
                  description={d.description || undefined}
>>>>>>> origin/uichange
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
