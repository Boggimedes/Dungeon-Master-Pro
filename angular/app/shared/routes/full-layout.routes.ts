import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../../shared/auth/auth-guard.service";

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("../../main-page/page.module").then((m) => m.PageModule),
  },
];
