import { BrandIcon } from "../../../components/utilities/Brand";
import { Link } from "../../../components/Link";
import Separator from "../../../components/tailus-ui/Separator";
import { Notifications } from "../../../components/Notifications";
import { UserDropdown } from "../../../components/UserDropdown";
import { UserSelect } from "../../../components/UserSelect";

import { StackedCards } from "../../../components/dashboard/Overview";
import Orders from "../../../components/dashboard/OrdersTable";
import { TwoAreasChart } from "../../../components/dashboard/AreaCharts";
import { SimpleBarChart } from "../../../components/dashboard/BarChart";
import { Traffic } from "../../../components/dashboard/Traffic";
import { StackedAreaChart } from "../../../components/dashboard/StackedAreas";

function Test() {
  return (
    <>
      <header className="feedback-bg fixed top-0 z-10 w-full border-b">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-center justify-between py-4">
            <div className="flex h-7 items-center gap-4">
              <a href="#" hidden className="sm:block">
                <BrandIcon />
              </a>
              <Separator
                hidden
                className="rotate-12 sm:block"
                orientation="vertical"
              />
              <UserSelect variant="plain" />
            </div>
            <div className="flex items-center gap-4">
              <Link link="#" label="Help" mainNav={false} />
              <Notifications />
              <div className="size-6 hidden sm:block">
                <UserDropdown />
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <nav className="relative flex h-10 gap-2 pb-2">
              <Link link="#" label="Home" isActive />
              <Link link="#" label="Store" />
              <Link link="#" label="Team" />
              <Link link="#" label="Inbox" />
              <Link link="#" label="Settings" />
            </nav>
          </div>
        </div>
      </header>
      <main className="mx-auto mt-28 h-full max-w-6xl px-5 space-y-6 py-6">
        <StackedCards />
        <div className="grid gap-6 lg:grid-cols-2">
          <TwoAreasChart />
          <SimpleBarChart />
          <Traffic />
          <StackedAreaChart />
        </div>
        <Orders />
      </main>
    </>
  );
}

export default Test;
