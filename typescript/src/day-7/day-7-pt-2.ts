import { INPUT, TEST } from './input';

const CD_TOKEN = '$ cd ';

interface File {
  name: string;
  size: number;
}

interface Directory {
  name: string;
  files: File[];
  children: Directory[];
  parent: Directory | null;
}

const mkdir = (name: string, parent: Directory | null): Directory => ({
  name,
  files: [],
  children: [],
  parent: parent ?? null,
});

const touch = (name: string, size: number): File => ({
  name,
  size,
});

let fileTree: Directory | null = null;
let currentDirectory: Directory | null = null;

const handleChangeDirectory = (changeToPath: string) => {
  if (!currentDirectory) {
    currentDirectory = mkdir(changeToPath, null);
    fileTree = currentDirectory;
  } else {
    if (changeToPath === '..') {
      currentDirectory = currentDirectory?.parent ?? null;
    } else {
      const newDir = mkdir(changeToPath, currentDirectory);
      currentDirectory.children.push(newDir);
      currentDirectory = newDir;
    }
  }
};

const parseDirectoryStructure = (input: string) => {
  input
    .split('\n')
    .filter((line) => line && !line.startsWith('$ ls') && !line.startsWith('dir'))
    .forEach((line) => {
      if (line.startsWith(CD_TOKEN)) {
        handleChangeDirectory(line.slice(CD_TOKEN.length));
      } else {
        const [size, name] = line.split(' ');
        currentDirectory?.files.push(touch(name, Number.parseInt(size)));
      }
    });
};

parseDirectoryStructure(INPUT);

const directorySizes: { [dirPath: string]: number } = {};

const calculateDirectorySizes = (dir: Directory | null, dirPath: string): number => {
  dir?.children.forEach((childDir) => {
    const totalSize = calculateDirectorySizes(childDir, dirPath + childDir.name + '/');
    directorySizes[dirPath + childDir.name] = totalSize;
  });

  const totalSizeOfChildDirs =
    dir?.children.reduce((sum, childDir) => sum + directorySizes[dirPath + childDir.name], 0) ?? 0;
  const totalSizeOfFiles = dir?.files.reduce((sum: number, file: File) => sum + file.size, 0) ?? 0;

  return totalSizeOfChildDirs + totalSizeOfFiles;
};

const totalDiskSpaceUsed = calculateDirectorySizes(fileTree, fileTree!.name);

const TOTAL_FS_SIZE = 70_000_000;
const SPACE_REQUIRED_FOR_UPDATE = 30_000_000;
const currentRemainingSpace = TOTAL_FS_SIZE - totalDiskSpaceUsed;
const targetDirSize = SPACE_REQUIRED_FOR_UPDATE - currentRemainingSpace;

const folderToDeleteSize = Object.values(directorySizes)
  .sort((a, b) => a - b)
  .find((dirSize) => dirSize >= targetDirSize);
console.log(folderToDeleteSize);
