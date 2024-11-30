import sidebarMenu from "@/config/sidebar-menu";
import { FC, useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";

const Sidebar: FC = () => {
  // Get the current path
  const router = useRouter();
  const pathname = router.state.location.pathname;

  // Collapsed Sidebar
  const [collapsed, setCollapsed] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (menuId: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
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
    <div className="relative px-3 py-5 bg-white lg:px-4 lg:py-5">
      {/* KKH Logo */}
      <div className="flex items-center justify-center">
        <a href="/">
          {collapsed && (
            <img
              src="/assets/images/logo.svg"
              alt="KKH Logo"
              className="rounded-md cursor-pointer w-9 "
            />
          )}

          {!collapsed && (
            <img
              src="/assets/images/KKHLogo_transparent.svg"
              alt="KKH Logo"
              className="rounded-md cursor-pointer lg:w-36 "
            />
          )}
        </a>
      </div>
      <hr className="border border-sidebar-border-0.5 mt-3" />

      {/* Sidebar Icon */}
      <div>
        <ul>
          {sidebarMenu.map((item) => {
            // Check if the current path is active
            const isActive = item.active?.includes(pathname);

            return (
              <li key={item.id} className="my-6">
                <a
                  href={item.path}
                  className={`flex items-center text-xs font-semibold px-4 py-3 rounded-md  ${
                    isActive
                      ? "bg-sidebar-active  backdrop-blur-lg rounded-md text-white shadow-lg"
                      : "text-sidebar hover:bg-sidebar-hover"
                  } ${collapsed ? "justify-center bg-opacity-35" : ""}`}
                  onClick={() =>
                    item.subMenu
                      ? toggleSubMenu(item.id)
                      : router.navigate({ to: item.path || "/" })
                  }
                >
                  {/* Render Icon Image only when collapsed */}
                  {collapsed && item.icons ? (
                    <img
                      src={item.icons}
                      alt={item.label}
                      className={`w-4 h-4 ${isActive ? "text-white" : "text-sidebar"} mr-2`}
                    />
                  ) : null}

                  {!collapsed && item.label}
                </a>

                {/* Render Submenu */}
                {!collapsed && item.subMenu && openSubMenus[item.id] && (
                  <ul className=" mt-2 space-y-2">
                    {item.subMenu.map((subItem) => {
                      const isSubActive = subItem.active?.includes(pathname);
                      return (
                        <li key={subItem.id}>
                          <a
                            href={subItem.path}
                            className={`flex items-center text-xs font-semibold px-4 py-3  rounded-md ${
                              isSubActive
                                ? "bg-sidebar-active text-white"
                                : "text-sidebar hover:bg-sidebar-hover"
                            }`}
                          >
                            {subItem.icons &&
                            typeof subItem.icons === "string" ? (
                              <img
                                src={subItem.icons}
                                alt={subItem.label}
                                className="w-4 h-4 mr-2"
                              />
                            ) : (
                              subItem.icons
                            )}
                            {subItem.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
