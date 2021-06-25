import { useState } from "react";
import Sidebar from "../components/Sidebar2";
import Header from "../components/Header";
import Layout from "../components/Layout";

export default function StoryBook() {
  return (
    <Layout>
      <img className="w-full" src="https://source.unsplash.com/random" />
    </Layout>
  );
}
