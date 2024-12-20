import { FC } from "react";
import { Sidebar } from "flowbite-react";
import { useRouter } from "@tanstack/react-router";
import sidebarMenu from "@/config/sidebar-menu";

const SidebarNavigation: FC = () => {
  const router = useRouter();
  const pathname = router.state.location.pathname;

  return (
    <Sidebar className="bg-white">
      {/* Sidebar Logo */}
      <Sidebar.Logo
        href="/"
        img={
          "/assets/images/KKHLogo_transparent.svg"
        }
        imgAlt="KKH Logo"
        className="cursor-pointer transition-all duration-300 mb-4 mt-3 ml-1 w-36 "   
      />

      {/* Sidebar Items */}
      <Sidebar.Items>
        {sidebarMenu.map((item) => {
          const isActive = item.active?.includes(pathname);

          // Master Data
          if (item.subMenu) {
            return (
              <Sidebar.ItemGroup key={item.id}>
                <Sidebar.Collapse
                  label={item.label}
                  className="text-2xs"
                  icon={() =>
                    item.icons && (
                      <img
                        src={item.icons}
                        alt={item.label}
                        className="w-4 h-4 mr-3"
                      />
                    )
                  }
                >
                  {item.subMenu.map((subItem) => (
                    <Sidebar.Item
                      key={subItem.id}
                      href={subItem.path}
                      onClick={() => {
                        router.navigate({ to: subItem.path || "/" });
                      }}
                      
                      className={`text-2xs${
                        subItem.active?.includes(pathname)
                          ? "font-bold border border-sidebar-active "
                          : ""
                      }`}
                    >
                      {subItem.label}
                    </Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              </Sidebar.ItemGroup>
            );
          }

          // Regular SideBar Item
          return (
            <Sidebar.ItemGroup key={item.id}>
              <Sidebar.Item
                href={item.path}
                icon={() =>
                   item.icons && (
                    <img
                      src={item.icons}
                      alt={item.label}
                      className="w-4 h-4"
                    />
                  )
                }
                active={isActive}
                onClick={() => {
                  router.navigate({ to: item.path || "/" });
                }}
                className={`text-2xs transition-all duration-200 ease-in-out ${isActive ? "font-bold border border-sidebar-active " : ""}`}
              >
                { item.label}
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          );
        })}
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarNavigation;
