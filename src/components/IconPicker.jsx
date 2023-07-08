import React, { useEffect, useState } from "react";
import ImageUploadIcon from "./ImageUploadIcon";
import { BiSolidPencil } from "react-icons/bi";

function IconPicker({ onChange, initialIconUrl }) {
  const [iconSelection, setIconSelection] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  useEffect(() => {
    setIsPlaceholderVisible(!iconSelection && !initialIconUrl);
  }, [iconSelection, initialIconUrl]);

  const onIconSelection = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setIconSelection(null);
      onChange(null);

      return;
    }

    setIconSelection(e.target.files[0]);
    onChange(e.target.files[0]);
  };

  useEffect(() => {
    if (!iconSelection) {
      setIconUrl(initialIconUrl);
      return;
    }

    const selectionUrl = URL.createObjectURL(iconSelection);
    setIconUrl(selectionUrl);

    return () => URL.revokeObjectURL(selectionUrl);
  }, [iconSelection]);

  return (
    <div className="relative">
      {isPlaceholderVisible && <ImageUploadIcon />}
      {!isPlaceholderVisible && (
        <>
          <img src={iconUrl} alt="Picked Icon" className="h-20 w-20 rounded-full object-cover" />
          <span className="absolute right-0 top-0 rounded-full bg-blurple-400 p-1 text-lg text-white">
            <BiSolidPencil />
          </span>
        </>
      )}
      <input
        className="absolute left-0 top-0 h-full w-full opacity-0"
        type="file"
        name="iconpicker"
        id="iconpicker"
        accept="image/*"
        onChange={onIconSelection}
      />
    </div>
  );
}

export default IconPicker;
