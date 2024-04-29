import { useToast } from "@/components/ui/toast/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { h } from "vue";

const { toast } = useToast();
export function useToastAction() {
  function showToast(
    title: string,
    description: string,
    variant: "default" | "destructive" = "default"
  ) {
    return toast({
      title,
      description,
      variant,
      action: h(
        ToastAction,
        {
          altText: "Ok",
        },
        {
          default: () => "Ok",
        }
      ),
    });
  }

  return { showToast };
}
