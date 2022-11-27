import VirtualList from './components/VirtualList';
import VirtualTable from './components/VirtualTable';

function App() {
  return (
    <div className="App">
      <h2>&#128512;虚拟列表</h2>
      <VirtualList />
      <h2>&#9996;虚拟表格</h2>
      <VirtualTable />
    </div>
  );
}

export default App;
