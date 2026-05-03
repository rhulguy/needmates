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
