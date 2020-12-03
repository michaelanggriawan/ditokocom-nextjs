import React, { useEffect, useState } from "react";
import Axios from "axios";
import { ListCategory } from "../listCategory/listCategory";

export default function Category({ setBannerLoad }) {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://dev.api.ditoko.com/api/v1/favorite/sub-categories`
    ).then((res) => {
      setSubCategories([...res.data.result]);
    });
  }, []);
  return <ListCategory data={subCategories} setBannerLoad={setBannerLoad} />;
}
