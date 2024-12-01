import sidebarMenu from "@/config/sidebar-menu";
import { FC, useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";

const Sidebar: FC = () => {
  const router = useRouter();
  const pathname = router.state.location.pathname;

  const [collapsed, setCollapsed] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1280);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`relative bg-white transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-48"
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center py-3">
        <a href="/">
          <img
            src={
              collapsed
                ? "/assets/images/logo.svg"
                : "/assets/images/KKHLogo_transparent.svg"
            }
            alt="KKH Logo"
            className={`cursor-pointer transition-all duration-300 ${
              collapsed ? "w-9" : "lg:w-36"
            }`}
          />
        </a>
      </div>

      {/* Sidebar Menu */}
      <div className="relative">
        <ul>
          {sidebarMenu.map((item) => {
            const isActive = item.active?.includes(pathname);

            return (
              <li
                key={item.id}
                className="my-3 relative"
                onMouseEnter={() => setHoveredMenu(item.id)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <a
                  href={item.path}
                  className={`flex items-center px-6 py-3 text-2xs font-semibold rounded-md transition-all duration-300 m-1 ${
                    isActive
                      ? "bg-sidebar-active  backdrop-blur-lg rounded-lg text-white shadow-lg"
                      : "text-sidebar hover:bg-sidebar-hover"
                  } ${collapsed ? "justify-center bg-opacity-35" : ""}`}
                  onClick={() => {
                    if (!collapsed || !item.subMenu) {
                      router.navigate({ to: item.path || "/" });
                    }
                  }}
                >
                  {collapsed && item.icons ? (
                    <img
                      src={item.icons}
                      alt={item.label}
                      className={`w-4 h-4 ${isActive ? "text-white" : "text-sidebar"} mr-2`}
                    />
                  ) : null}

                  {/* Label */}
                  {!collapsed && item.label}
                </a>

                {/* Floating Submenu */}
                {item.subMenu && (
                  <div
                    className={`absolute ${
                      collapsed ? "left-12" : "left-full"
                    } top-0 z-10 bg-white shadow-lg rounded-md py-2 w-48 transition-transform duration-300  ${
                      hoveredMenu === item.id ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transform:
                        hoveredMenu === item.id
                          ? "translateX(10px)"
                          : "translateX(0)",
                      visibility:
                        hoveredMenu === item.id ? "visible" : "hidden",
                    }}
                  >
                    <ul>
                      {item.subMenu.map((subItem) => {
                        const isSubActive = subItem.active?.includes(pathname);
                        return (
                          <li key={subItem.id}>
                            <a
                              href={subItem.path}
                              className={`block px-4 py-2 text-2xs font-medium transition-all rounded-md ${
                                isSubActive
                                  ? "bg-sidebar-active text-white"
                                  : "text-sidebar hover:bg-sidebar-hover"
                              }`}
                            >
                              {subItem.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
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
