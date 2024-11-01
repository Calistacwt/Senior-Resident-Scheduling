import sidebarMenu from "@/config/sidebar-menu";
import { FC, useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";

const Sidebar: FC = () => {
  // Get the current path
  const router = useRouter();
  const pathname = router.state.location.pathname;

  // Collapsed Sidebar
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative px-3 py-5 bg-white border-r border-sidebar-border lg:px-4 lg:py-3">
      <div className="flex items-center justify-center">
        <a href="/">
          <img
            src={
              collapsed
                ? "/assets/images/logo.svg"
                : "/assets/images/KKHlogo.svg"
            }
            alt="KKH Logo"
            className="rounded-md cursor-pointer w-11 lg:w-44"
          />
        </a>
      </div>
      <div>
        <ul>
          {sidebarMenu.map((item) => {
            // Check if the current path is active
            const isActive = item.active?.includes(pathname);
            const Icon = item.icon;
            return (
              <li key={item.id} className="my-6">
                <a
                  href={item.path}
                  className={`flex items-center text-xs font-semibold px-4 py-3 rounded-md ${
                    isActive
                      ? "bg-sidebar-active text-white"
                      : "text-sidebar hover:bg-sidebar-hover"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  {collapsed && Icon && (
                    <Icon
                      className={`w-5  fill-none stroke-current stroke-1 ${
                        isActive ? "text-white" : "text-sidebar"
                      }`}
                    />
                  )}

                  {!collapsed && item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
