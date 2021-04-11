import { Container } from "@material-ui/core";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}
