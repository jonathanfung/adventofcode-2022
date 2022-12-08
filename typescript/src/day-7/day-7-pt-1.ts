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

calculateDirectorySizes(fileTree, fileTree!.name);

const result = Object.values(directorySizes).reduce(
  (sum, dirSize) => (dirSize <= 100_000 ? sum + dirSize : sum),
  0
);

console.log(result);
