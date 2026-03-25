import { Layout } from './components/Layout';
import { LibraryPage } from './pages/LibraryPage';
import { AssetModalManager } from './components/AssetModal/AssetModalManager';

function App() {
  return (
    <Layout>
      <LibraryPage />
      <AssetModalManager />
    </Layout>
  );
}

export default App;
