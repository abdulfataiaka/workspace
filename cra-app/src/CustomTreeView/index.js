import { memo, forwardRef } from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const regulator = {
  id: 'some-regulator-id',
  name: 'AML/CFT Handbook for the Accountancy Sector',
  sections: {
    nodes: Array(10).fill(null).map((_, index) => ({
      id: `ascent-module-id-${index + 1}`,
      name: `Ascent Module ${index + 1}`,
      relationalType: 'AscentModule',
      sections: {
        nodes: Array(8).fill(null).map((_, index) => ({
          id: `subject-id-${index + 1}`,
          name: `Subject ${index + 1}`,
          relationalType: 'Subject',
          rules: {
            nodes: Array(4).fill(null).map((_, index) => ({
              id: `rule-id-${index + 1}`,
              name: `Rule ${index + 1}`,
            })),
          },
        })),
      },
    })),
  },
};

const ContentComponent = memo(forwardRef(({ node }, ref) => {
  console.log('Rendered: ' + node.name);

  const { handleExpansion } = useTreeItem(node.id);

  return <div onClick={handleExpansion}>{node.name}</div>
}));

const CustomTreeView = () => {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {regulator.sections.nodes.map((node) => (
        <TreeItem
          key={node.id}
          nodeId={node.id}
          ContentComponent={ContentComponent}
          ContentProps={{ node }}
        >
          {node.sections.nodes.map((n) => (
            <TreeItem
              key={n.id}
              nodeId={n.id}
              ContentComponent={ContentComponent}
              ContentProps={{ node: n }}
            >
              <div>DSFD</div>
            </TreeItem>
          ))}
        </TreeItem>
      ))}
    </TreeView>
  );
};

export default CustomTreeView;
