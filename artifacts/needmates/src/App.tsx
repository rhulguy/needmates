import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import HomePage from "@/routes/HomePage";
import NeedsFeedPage from "@/routes/NeedsFeedPage";
import CreateNeedPage from "@/routes/CreateNeedPage";
import NeedDetailPage from "@/routes/NeedDetailPage";
import OffersPage from "@/routes/OffersPage";
import ProfilePage from "@/routes/ProfilePage";
import BusinessPage from "@/routes/BusinessPage";
import HowItWorksPage from "@/routes/HowItWorksPage";

import AccountDashboardPage from "@/routes/AccountDashboardPage";
import AccountNeedsPage from "@/routes/AccountNeedsPage";
import AccountResponsesPage from "@/routes/AccountResponsesPage";
import AccountSavedPage from "@/routes/AccountSavedPage";
import AccountVouchesPage from "@/routes/AccountVouchesPage";
import AccountEditProfilePage from "@/routes/AccountEditProfilePage";
import AccountSettingsPage from "@/routes/AccountSettingsPage";

import AdminDashboardPage from "@/routes/AdminDashboardPage";
import AdminUsersPage from "@/routes/AdminUsersPage";
import AdminNeedsPage from "@/routes/AdminNeedsPage";
import AdminBusinessesPage from "@/routes/AdminBusinessesPage";
import AdminCategoriesPage from "@/routes/AdminCategoriesPage";
import AdminReportsPage from "@/routes/AdminReportsPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/feed" component={NeedsFeedPage} />
      <Route path="/create" component={CreateNeedPage} />
      <Route path="/need/:id" component={NeedDetailPage} />
      <Route path="/offers" component={OffersPage} />
      <Route path="/profile/:id" component={ProfilePage} />
      <Route path="/business" component={BusinessPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />

      <Route path="/account" component={AccountDashboardPage} />
      <Route path="/account/needs" component={AccountNeedsPage} />
      <Route path="/account/responses" component={AccountResponsesPage} />
      <Route path="/account/saved" component={AccountSavedPage} />
      <Route path="/account/vouches" component={AccountVouchesPage} />
      <Route path="/account/edit-profile" component={AccountEditProfilePage} />
      <Route path="/account/settings" component={AccountSettingsPage} />

      <Route path="/admin" component={AdminDashboardPage} />
      <Route path="/admin/users" component={AdminUsersPage} />
      <Route path="/admin/needs" component={AdminNeedsPage} />
      <Route path="/admin/businesses" component={AdminBusinessesPage} />
      <Route path="/admin/categories" component={AdminCategoriesPage} />
      <Route path="/admin/reports" component={AdminReportsPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
