import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <nav className="flex w-[4.5rem] flex-col items-center gap-2 bg-gray-900 py-3">
      <SidebarItem popupText="Server 1" onClick={() => console.log("click")} active={false}>
        <div className="flex h-full w-full items-center justify-center bg-green">S1</div>
      </SidebarItem>
      <SidebarItem popupText="Server 2" onClick={() => console.log("click")} active={true}>
        <div className="flex h-full w-full items-center justify-center bg-yellow">S2</div>
      </SidebarItem>
      <SidebarItem popupText="Server 3" onClick={() => console.log("click")} active={false}>
        <div className="flex h-full w-full items-center justify-center bg-blue">S3</div>
      </SidebarItem>
    </nav>
  );
}

export default Sidebar;
