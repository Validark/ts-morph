import * as ts from "typescript";
import { SyntaxKind, CompilerOptions, EmitHint, ScriptKind, NewLineKind, LanguageVariant, ScriptTarget, TypeFlags, ObjectFlags, SymbolFlags, TypeFormatFlags, DiagnosticCategory, EditorSettings, ModuleResolutionKind } from "typescript";
import { CodeBlockWriter } from "./code-block-writer";

export declare class Directory {
    private __context;
    private _path;
    private _pathParts;
    private _emitInternal;
    private constructor();
    /**
     * Checks if this directory is an ancestor of the provided directory.
     * @param possibleDescendant - Directory or source file that's a possible descendant.
     */
    isAncestorOf(possibleDescendant: Directory | SourceFile): boolean;
    /**
     * Checks if this directory is a descendant of the provided directory.
     * @param possibleAncestor - Directory or source file that's a possible ancestor.
     */
    isDescendantOf(possibleAncestor: Directory): boolean;
    /**
     * Gets the path to the directory.
     */
    getPath(): string;
    /**
     * Gets the directory path's base name.
     */
    getBaseName(): string;
    /**
     * Gets the parent directory or throws if it doesn't exist or was never added to the project.
     */
    getParentOrThrow(): Directory;
    /**
     * Gets the parent directory if it exists and was added to the project.
     */
    getParent(): Directory | undefined;
    /**
     * Gets a child directory with the specified path or throws if not found.
     * @param path - Relative path from this directory or absolute path.
     */
    getDirectoryOrThrow(path: string): Directory;
    /**
     * Gets a child directory by the specified condition or throws if not found.
     * @param condition - Condition to check the directory with.
     */
    getDirectoryOrThrow(condition: (directory: Directory) => boolean): Directory;
    /**
     * Gets a directory with the specified path or undefined if not found.
     * @param path - Relative path from this directory or absolute path.
     */
    getDirectory(path: string): Directory | undefined;
    /**
     * Gets a child directory by the specified condition or undefined if not found.
     * @param condition - Condition to check the directory with.
     */
    getDirectory(condition: (directory: Directory) => boolean): Directory | undefined;
    /**
     * Gets a child source file with the specified path or throws if not found.
     * @param path - Relative or absolute path to the file.
     */
    getSourceFileOrThrow(path: string): SourceFile;
    /**
     * Gets a child source file by the specified condition or throws if not found.
     * @param condition - Condition to check the source file with.
     */
    getSourceFileOrThrow(condition: (sourceFile: SourceFile) => boolean): SourceFile;
    /**
     * Gets a child source file with the specified path or undefined if not found.
     * @param path - Relative or absolute path to the file.
     */
    getSourceFile(path: string): SourceFile | undefined;
    /**
     * Gets a child source file by the specified condition or undefined if not found.
     * @param condition - Condition to check the source file with.
     */
    getSourceFile(condition: (sourceFile: SourceFile) => boolean): SourceFile | undefined;
    /**
     * Gets the child directories.
     */
    getDirectories(): Directory[];
    /**
     * Gets the source files within this directory.
     */
    getSourceFiles(): SourceFile[];
    /**
     * Gets the source files in the current directory and all the descendant directories.
     */
    getDescendantSourceFiles(): SourceFile[];
    /**
     * Gets the descendant directories.
     */
    getDescendantDirectories(): Directory[];
    /**
     * Add source files based on file globs.
     * @param fileGlobs - File glob or globs to add files based on.
     * @returns The matched source files.
     */
    addExistingSourceFiles(fileGlobs: string | ReadonlyArray<string>): SourceFile[];
    /**
     * Adds an existing directory from the relative path or directory name, or returns undefined if it doesn't exist.
     *
     * Will return the directory if it was already added.
     * @param dirPath - Directory name or path to the directory that should be added.
     * @param options - Options.
     */
    addExistingDirectoryIfExists(dirPath: string, options?: DirectoryAddOptions): Directory | undefined;
    /**
     * Adds an existing directory from the relative path or directory name, or throws if it doesn't exist.
     *
     * Will return the directory if it was already added.
     * @param dirPath - Directory name or path to the directory that should be added.
     * @throws DirectoryNotFoundError if the directory does not exist.
     */
    addExistingDirectory(dirPath: string, options?: DirectoryAddOptions): Directory;
    /**
     * Creates a directory if it doesn't exist.
     * @param dirPath - Relative or absolute path to the directory that should be created.
     */
    createDirectory(dirPath: string): Directory;
    /**
     * Creates a source file, relative to this directory.
     *
     * Note: The file will not be created and saved to the file system until .save() is called on the source file.
     * @param relativeFilePath - Relative file path of the source file to create.
     * @param sourceFileText - Text, structure, or writer function to create the source file text with.
     * @param options - Options.
     * @throws - InvalidOperationError if a source file already exists at the provided file name.
     */
    createSourceFile(relativeFilePath: string, sourceFileText?: string | OptionalKind<SourceFileStructure> | WriterFunction, options?: SourceFileCreateOptions): SourceFile;
    /**
     * Adds an existing source file, relative to this directory, or returns undefined.
     *
     * Will return the source file if it was already added.
     * @param relativeFilePath - Relative file path to add.
     */
    addExistingSourceFileIfExists(relativeFilePath: string): SourceFile | undefined;
    /**
     * Adds an existing source file, relative to this directory, or throws if it doesn't exist.
     *
     * Will return the source file if it was already added.
     * @param relativeFilePath - Relative file path to add.
     * @throws FileNotFoundError when the file doesn't exist.
     */
    addExistingSourceFile(relativeFilePath: string): SourceFile;
    /**
     * Emits the files in the directory.
     * @param options - Options for emitting.
     */
    emit(options?: {
            emitOnlyDtsFiles?: boolean;
            outDir?: string;
            declarationDir?: string;
        }): Promise<DirectoryEmitResult>;
    /**
     * Emits the files in the directory synchronously.
     *
     * Remarks: This might be very slow compared to the asynchronous version if there are a lot of files.
     * @param options - Options for emitting.
     */
    emitSync(options?: {
            emitOnlyDtsFiles?: boolean;
            outDir?: string;
            declarationDir?: string;
        }): DirectoryEmitResult;
    /**
     * Copies the directory to a subdirectory of the specified directory.
     * @param dirPathOrDirectory Directory path or directory object to copy the directory to.
     * @param options Options for copying.
     * @returns The new copied directory.
     */
    copyToDirectory(dirPathOrDirectory: string | Directory, options?: DirectoryCopyOptions): Directory;
    /**
     * Copies the directory to a new directory.
     * @param relativeOrAbsolutePath - The relative or absolute path to the new directory.
     * @param options - Options.
     * @returns The directory the copy was made to.
     */
    copy(relativeOrAbsolutePath: string, options?: DirectoryCopyOptions): Directory;
    /**
     * Immediately copies the directory to the specified path asynchronously.
     * @param relativeOrAbsolutePath - Directory path as an absolute or relative path.
     * @param options - Options for moving the directory.
     * @remarks If includeTrackedFiles is true, then it will execute the pending operations in the current directory.
     */
    copyImmediately(relativeOrAbsolutePath: string, options?: DirectoryCopyOptions): Promise<Directory>;
    /**
     * Immediately copies the directory to the specified path synchronously.
     * @param relativeOrAbsolutePath - Directory path as an absolute or relative path.
     * @param options - Options for moving the directory.
     * @remarks If includeTrackedFiles is true, then it will execute the pending operations in the current directory.
     */
    copyImmediatelySync(relativeOrAbsolutePath: string, options?: DirectoryCopyOptions): Directory;
    /**
     * Moves the directory to a subdirectory of the specified directory.
     * @param dirPathOrDirectory Directory path or directory object to move the directory to.
     * @param options Options for moving.
     */
    moveToDirectory(dirPathOrDirectory: string | Directory, options?: DirectoryMoveOptions): this;
    /**
     * Moves the directory to a new path.
     * @param relativeOrAbsolutePath - Directory path as an absolute or relative path.
     * @param options - Options for moving the directory.
     */
    move(relativeOrAbsolutePath: string, options?: DirectoryMoveOptions): this;
    /**
     * Immediately moves the directory to a new path asynchronously.
     * @param relativeOrAbsolutePath - Directory path as an absolute or relative path.
     * @param options - Options for moving the directory.
     */
    moveImmediately(relativeOrAbsolutePath: string, options?: DirectoryMoveOptions): Promise<this>;
    /**
     * Immediately moves the directory to a new path synchronously.
     * @param relativeOrAbsolutePath - Directory path as an absolute or relative path.
     * @param options - Options for moving the directory.
     */
    moveImmediatelySync(relativeOrAbsolutePath: string, options?: DirectoryMoveOptions): this;
    /**
     * Queues a deletion of the directory to the file system.
     *
     * The directory will be deleted when calling ast.save(). If you wish to delete the file immediately, then use deleteImmediately().
     */
    delete(): void;
    /**
     * Asyncronously deletes the directory and all its descendants from the file system.
     */
    deleteImmediately(): Promise<void>;
    /**
     * Synchronously deletes the directory and all its descendants from the file system.
     */
    deleteImmediatelySync(): void;
    /**
     * Forgets the directory and all its descendants from the Project.
     *
     * Note: Does not delete the directory from the file system.
     */
    forget(): void;
    /**
     * Asynchronously saves the directory and all the unsaved source files to the disk.
     */
    save(): Promise<void>;
    /**
     * Synchronously saves the directory and all the unsaved source files to the disk.
     */
    saveSync(): void;
    /**
     * Gets the relative path to another source file.
     * @param sourceFile - Source file.
     */
    getRelativePathTo(sourceFile: SourceFile): string;
    /**
     * Gets the relative path to another directory.
     * @param directory - Directory.
     */
    getRelativePathTo(directory: Directory): string;
    /**
     * Gets the relative path to the specified source file as a module specifier.
     * @param sourceFile - Source file.
     */
    getRelativePathAsModuleSpecifierTo(sourceFile: SourceFile): string;
    /**
     * Gets the relative path to the specified directory as a module specifier.
     * @param directory - Directory.
     */
    getRelativePathAsModuleSpecifierTo(directory: Directory): string;
    /**
     * Gets if the directory was forgotten.
     */
    wasForgotten(): boolean;
}

export interface DirectoryAddOptions {
    /**
     * Whether to also recursively add all the directory's descendant directories.
     * @remarks Defaults to false.
     */
    recursive?: boolean;
}

export interface DirectoryCopyOptions extends SourceFileCopyOptions {
    /**
     * Includes all the files in the directory and sub-directory when copying.
     * @remarks - Defaults to true.
     */
    includeUntrackedFiles?: boolean;
}

export declare class DirectoryEmitResult {
    private readonly _skippedFilePaths;
    private readonly _outputFilePaths;
    private constructor();
    /**
     * Gets if the emit was skipped.
     * @deprecated This is being deprecated in favour of getSkippedFilePaths().
     */
    getEmitSkipped(): boolean;
    /**
     * Gets a collections of skipped file paths.
     */
    getSkippedFilePaths(): string[];
    /**
     * Gets the output file paths.
     */
    getOutputFilePaths(): string[];
}

export interface DirectoryMoveOptions extends SourceFileMoveOptions {
}

export interface FileSystemHost {
    /**
     * Gets if this file system is case sensitive.
     */
    isCaseSensitive(): boolean;
    delete(path: string): Promise<void>;
    deleteSync(path: string): void;
    readDirSync(dirPath: string): string[];
    readFile(filePath: string, encoding?: string): Promise<string>;
    readFileSync(filePath: string, encoding?: string): string;
    writeFile(filePath: string, fileText: string): Promise<void>;
    writeFileSync(filePath: string, fileText: string): void;
    mkdir(dirPath: string): Promise<void>;
    mkdirSync(dirPath: string): void;
    move(srcPath: string, destPath: string): Promise<void>;
    moveSync(srcPath: string, destPath: string): void;
    copy(srcPath: string, destPath: string): Promise<void>;
    copySync(srcPath: string, destPath: string): void;
    fileExists(filePath: string): Promise<boolean>;
    fileExistsSync(filePath: string): boolean;
    directoryExists(dirPath: string): Promise<boolean>;
    directoryExistsSync(dirPath: string): boolean;
    /**
     * See https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options
     */
    realpathSync(path: string): string;
    getCurrentDirectory(): string;
    glob(patterns: ReadonlyArray<string>): string[];
}

/**
 * Options for creating a project.
 */
export interface ProjectOptions {
    /**
     * Compiler options
     */
    compilerOptions?: CompilerOptions;
    /**
     * File path to the tsconfig.json file.
     */
    tsConfigFilePath?: string;
    /**
     * Whether to add the source files from the specified tsconfig.json or not. Defaults to true.
     */
    addFilesFromTsConfig?: boolean;
    /**
     * Manipulation settings
     */
    manipulationSettings?: Partial<ManipulationSettings>;
    /**
     * Skip resolving file dependencies when providing a ts config file path and adding the files from tsconfig.
     */
    skipFileDependencyResolution?: boolean;
    /**
     * Whether to use an in-memory file system.
     */
    useVirtualFileSystem?: boolean;
    /**
     * Optional file system host. Useful for mocking access to the file system.
     * @remarks Consider using `useVirtualFileSystem` instead.
     */
    fileSystem?: FileSystemHost;
    /**
     * Creates a resolution host for specifying custom module and/or type reference directive resolution.
     */
    resolutionHost?: ResolutionHostFactory;
}

/**
 * Project that holds source files.
 */
export declare class Project {
    /**
     * Gets the manipulation settings.
     */
    readonly manipulationSettings: ManipulationSettingsContainer;
    /**
     * Gets the compiler options for modification.
     */
    readonly compilerOptions: CompilerOptionsContainer;
    private _getUnsavedSourceFiles;
    /**
     * Initializes a new instance.
     * @param options - Optional options.
     */
    constructor(options?: ProjectOptions);
    /**
     * Adds the source files the project's source files depend on to the project.
     * @returns The added source files.
     * @remarks
     * * This should be done after source files are added to the project, preferably once to
     * avoid doing more work than necessary.
     * * This is done by default when creating a Project and providing a tsconfig.json and
     * not specifying to not add the source files.
     */
    resolveSourceFileDependencies(): SourceFile[];
    /**
     * Adds an existing directory from the path or returns undefined if it doesn't exist.
     *
     * Will return the directory if it was already added.
     * @param dirPath - Path to add the directory at.
     * @param options - Options.
     */
    addExistingDirectoryIfExists(dirPath: string, options?: DirectoryAddOptions): Directory | undefined;
    /**
     * Adds an existing directory from the path or throws if it doesn't exist.
     *
     * Will return the directory if it was already added.
     * @param dirPath - Path to add the directory at.
     * @param options - Options.
     * @throws DirectoryNotFoundError when the directory does not exist.
     */
    addExistingDirectory(dirPath: string, options?: DirectoryAddOptions): Directory;
    /**
     * Creates a directory at the specified path.
     * @param dirPath - Path to create the directory at.
     */
    createDirectory(dirPath: string): Directory;
    /**
     * Gets a directory by the specified path or throws if it doesn't exist.
     * @param dirPath - Path to create the directory at.
     */
    getDirectoryOrThrow(dirPath: string): Directory;
    /**
     * Gets a directory by the specified path or returns undefined if it doesn't exist.
     * @param dirPath - Directory path.
     */
    getDirectory(dirPath: string): Directory | undefined;
    /**
     * Gets all the directories.
     */
    getDirectories(): Directory[];
    /**
     * Gets the directories without a parent.
     */
    getRootDirectories(): Directory[];
    /**
     * Adds source files based on file globs.
     * @param fileGlobs - File glob or globs to add files based on.
     * @returns The matched source files.
     */
    addExistingSourceFiles(fileGlobs: string | ReadonlyArray<string>): SourceFile[];
    /**
     * Adds a source file from a file path if it exists or returns undefined.
     *
     * Will return the source file if it was already added.
     * @param filePath - File path to get the file from.
     */
    addExistingSourceFileIfExists(filePath: string): SourceFile | undefined;
    /**
     * Adds an existing source file from a file path or throws if it doesn't exist.
     *
     * Will return the source file if it was already added.
     * @param filePath - File path to get the file from.
     * @throws FileNotFoundError when the file is not found.
     */
    addExistingSourceFile(filePath: string): SourceFile;
    /**
     * Adds all the source files from the specified tsconfig.json.
     *
     * Note that this is done by default when specifying a tsconfig file in the constructor and not explicitly setting the
     * addFilesFromTsConfig option to false.
     * @param tsConfigFilePath - File path to the tsconfig.json file.
     */
    addSourceFilesFromTsConfig(tsConfigFilePath: string): SourceFile[];
    /**
     * Creates a source file at the specified file path with the specified text.
     *
     * Note: The file will not be created and saved to the file system until .save() is called on the source file.
     * @param filePath - File path of the source file.
     * @param sourceFileText - Text, structure, or writer function for the source file text.
     * @param options - Options.
     * @throws - InvalidOperationError if a source file already exists at the provided file path.
     */
    createSourceFile(filePath: string, sourceFileText?: string | OptionalKind<SourceFileStructure> | WriterFunction, options?: SourceFileCreateOptions): SourceFile;
    /**
     * Removes a source file from the AST.
     * @param sourceFile - Source file to remove.
     * @returns True if removed.
     */
    removeSourceFile(sourceFile: SourceFile): boolean;
    /**
     * Gets a source file by a file name or file path. Throws an error if it doesn't exist.
     * @param fileNameOrPath - File name or path that the path could end with or equal.
     */
    getSourceFileOrThrow(fileNameOrPath: string): SourceFile;
    /**
     * Gets a source file by a search function. Throws an erorr if it doesn't exist.
     * @param searchFunction - Search function.
     */
    getSourceFileOrThrow(searchFunction: (file: SourceFile) => boolean): SourceFile;
    /**
     * Gets a source file by a file name or file path. Returns undefined if none exists.
     * @param fileNameOrPath - File name or path that the path could end with or equal.
     */
    getSourceFile(fileNameOrPath: string): SourceFile | undefined;
    /**
     * Gets a source file by a search function. Returns undefined if none exists.
     * @param searchFunction - Search function.
     */
    getSourceFile(searchFunction: (file: SourceFile) => boolean): SourceFile | undefined;
    /**
     * Gets all the source files added to the project.
     * @param globPattern - Glob pattern for filtering out the source files.
     */
    getSourceFiles(): SourceFile[];
    /**
     * Gets all the source files added to the project that match a pattern.
     * @param globPattern - Glob pattern for filtering out the source files.
     */
    getSourceFiles(globPattern: string): SourceFile[];
    /**
     * Gets all the source files added to the project that match the passed in patterns.
     * @param globPatterns - Glob patterns for filtering out the source files.
     */
    getSourceFiles(globPatterns: ReadonlyArray<string>): SourceFile[];
    /**
     * Gets the specified ambient module symbol or returns undefined if not found.
     * @param moduleName - The ambient module name with or without quotes.
     */
    getAmbientModule(moduleName: string): Symbol | undefined;
    /**
     * Gets the specified ambient module symbol or throws if not found.
     * @param moduleName - The ambient module name with or without quotes.
     */
    getAmbientModuleOrThrow(moduleName: string): Symbol;
    /**
     * Gets the ambient module symbols (ex. modules in the @types folder or node_modules).
     */
    getAmbientModules(): Symbol[];
    /**
     * Saves all the unsaved source files to the file system and deletes all deleted files.
     */
    save(): Promise<void>;
    /**
     * Synchronously saves all the unsaved source files to the file system and deletes all deleted files.
     *
     * Remarks: This might be very slow compared to the asynchronous version if there are a lot of files.
     */
    saveSync(): void;
    /**
     * Enables logging to the console.
     * @param enabled - Enabled.
     */
    enableLogging(enabled?: boolean): void;
    /**
     * Gets the pre-emit diagnostics.
     */
    getPreEmitDiagnostics(): Diagnostic[];
    /**
     * Gets the language service.
     */
    getLanguageService(): LanguageService;
    /**
     * Gets the program.
     */
    getProgram(): Program;
    /**
     * Gets the type checker.
     */
    getTypeChecker(): TypeChecker;
    /**
     * Gets the file system.
     */
    getFileSystem(): FileSystemHost;
    /**
     * Asynchronously emits all the source files to the file system as JavaScript files.
     * @param emitOptions - Optional emit options.
     */
    emit(emitOptions?: EmitOptions): Promise<EmitResult>;
    /**
     * Synchronously emits all the source files to the file system as JavaScript files.
     * @param emitOptions - Optional emit options.
     */
    emitSync(emitOptions?: EmitOptions): EmitResult;
    /**
     * Emits all the source files to memory.
     * @param emitOptions - Optional emit options.
     */
    emitToMemory(emitOptions?: EmitOptions): MemoryEmitResult;
    /**
     * Gets the compiler options.
     */
    getCompilerOptions(): CompilerOptions;
    /**
     * Creates a writer with the current manipulation settings.
     * @remarks Generally it's best to use a provided writer, but this may be useful in some scenarios.
     */
    createWriter(): CodeBlockWriter;
    /**
     * Forgets the nodes created in the scope of the passed in block.
     *
     * This is an advanced method that can be used to easily "forget" all the nodes created within the scope of the block.
     * @param block - Block of code to run.
     */
    forgetNodesCreatedInBlock(block: (remember: (...node: Node[]) => void) => void): void;
    /**
     * Forgets the nodes created in the scope of the passed in block asynchronously.
     *
     * This is an advanced method that can be used to easily "forget" all the nodes created within the scope of the block.
     * @param block - Block of code to run.
     */
    forgetNodesCreatedInBlock(block: (remember: (...node: Node[]) => void) => Promise<void>): void;
    /**
     * Formats an array of diagnostics with their color and context into a string.
     * @param diagnostics - Diagnostics to get a string of.
     * @param options - Collection of options. For exmaple, the new line character to use (defaults to the OS' new line character).
     */
    formatDiagnosticsWithColorAndContext(diagnostics: ReadonlyArray<Diagnostic>, opts?: {
            newLineChar?: "\n" | "\r\n";
        }): string;
    /**
     * Gets a ts.ModuleResolutionHost for the project.
     */
    getModuleResolutionHost(): ts.ModuleResolutionHost;
}

/**
 * Options for creating a source file.
 */
export interface SourceFileCreateOptions {
    /**
     * Whether a source file should be overwritten if it exists. Defaults to false.
     * @remarks When false, the method will throw when a file exists.
     */
    overwrite?: boolean;
    /**
     * Specifies the script kind of the source file.
     */
    scriptKind?: ScriptKind;
}

export declare type Constructor<T> = new (...args: any[]) => T;
export declare type WriterFunction = (writer: CodeBlockWriter) => void;
/**
 * Creates a wrapped node from a compiler node.
 * @param node - Node to create a wrapped node from.
 * @param info - Info for creating the wrapped node.
 */
export declare function createWrappedNode<T extends ts.Node = ts.Node>(node: T, opts?: CreateWrappedNodeOptions): CompilerNodeToWrappedType<T>;

export interface CreateWrappedNodeOptions {
    /**
     * Compiler options.
     */
    compilerOptions?: CompilerOptions;
    /**
     * Optional source file of the node. Will make it not bother going up the tree to find the source file.
     */
    sourceFile?: ts.SourceFile;
    /**
     * Type checker.
     */
    typeChecker?: ts.TypeChecker;
}

/**
 * Prints the provided node using the compiler's printer.
 * @param node - Compiler node.
 * @param options - Options.
 * @remarks If the node was not constructed with the compiler API factory methods and the node
 * does not have parents set, then use the other overload that accepts a source file.
 */
export declare function printNode(node: ts.Node, options?: PrintNodeOptions): string;
/**
 * Prints the provided node using the compiler's printer.
 * @param node - Compiler node.
 * @param sourceFile - Compiler source file.
 * @param options - Options.
 */
export declare function printNode(node: ts.Node, sourceFile: ts.SourceFile, options?: PrintNodeOptions): string;

/**
 * Options for printing a node.
 */
export interface PrintNodeOptions {
    /**
     * Whether to remove comments or not.
     */
    removeComments?: boolean;
    /**
     * New line kind.
     *
     * Defaults to line feed.
     */
    newLineKind?: NewLineKind;
    /**
     * From the compiler api: "A value indicating the purpose of a node. This is primarily used to
     * distinguish between an `Identifier` used in an expression position, versus an
     * `Identifier` used as an `IdentifierName` as part of a declaration. For most nodes you
     * should just pass `Unspecified`."
     *
     * Defaults to `Unspecified`.
     */
    emitHint?: EmitHint;
    /**
     * The script kind.
     *
     * @remarks This is only useful when passing in a compiler node that was constructed
     * with the compiler API factory methods.
     *
     * Defaults to TSX.
     */
    scriptKind?: ScriptKind;
}

export declare type SourceFileReferencingNodes = ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration | CallExpression;

export interface CompilerOptionsFromTsConfigOptions {
    encoding?: string;
    fileSystem?: FileSystemHost;
}

export interface CompilerOptionsFromTsConfigResult {
    options: CompilerOptions;
    errors: Diagnostic[];
}

/**
 * Gets the compiler options from a specified tsconfig.json
 * @param filePath - File path to the tsconfig.json.
 * @param options - Options.
 */
export declare function getCompilerOptionsFromTsConfig(filePath: string, options?: CompilerOptionsFromTsConfigOptions): CompilerOptionsFromTsConfigResult;

/**
 * Type guards for checking the type of a node.
 */
export declare class TypeGuards {
    private constructor();
    /**
     * Gets if the node has an expression.
     * @param node - Node to check.
     */
    static hasExpression<T extends Node>(node: T): node is T & {
            getExpression(): Expression;
        };
    /**
     * Gets if the node has a name.
     * @param node - Node to check.
     */
    static hasName<T extends Node>(node: T): node is T & {
            getName(): string;
            getNameNode(): Node;
        };
    /**
     * Gets if the node has a body.
     * @param node - Node to check.
     */
    static hasBody<T extends Node>(node: T): node is T & {
            getBody(): Node;
        };
    /**
     * Gets if the provided value is a Node.
     */
    static isNode(value: unknown): value is Node;
    /**
     * Gets if the provided node is a comment node.
     */
    static isCommentNode(node: Node): node is CommentStatement | CommentClassElement | CommentTypeElement | CommentObjectLiteralElement | CommentEnumMember;
    /**
     * Gets if the provided node is a CommentStatement.
     */
    static isCommentStatement(node: Node): node is CommentStatement;
    /**
     * Gets if the provided node is a CommentClassElement.
     */
    static isCommentClassElement(node: Node): node is CommentClassElement;
    /**
     * Gets if the provided value is a CommentTypeElement.
     */
    static isCommentTypeElement(node: Node): node is CommentTypeElement;
    /**
     * Gets if the provided node is a CommentObjectLiteralElement.
     */
    static isCommentObjectLiteralElement(node: Node): node is CommentObjectLiteralElement;
    /**
     * Gets if the provided node is a CommentEnumMember.
     */
    static isCommentEnumMember(node: Node): node is CommentEnumMember;
    /**
     * Gets if the node is an AbstractableNode.
     * @param node - Node to check.
     */
    static isAbstractableNode<T extends Node>(node: T): node is AbstractableNode & AbstractableNodeExtensionType & T;
    /**
     * Gets if the node is an AmbientableNode.
     * @param node - Node to check.
     */
    static isAmbientableNode<T extends Node>(node: T): node is AmbientableNode & AmbientableNodeExtensionType & T;
    /**
     * Gets if the node is an AnyKeyword.
     * @param node - Node to check.
     */
    static isAnyKeyword(node: Node): node is Expression;
    /**
     * Gets if the node is an ArgumentedNode.
     * @param node - Node to check.
     */
    static isArgumentedNode<T extends Node>(node: T): node is ArgumentedNode & ArgumentedNodeExtensionType & T;
    /**
     * Gets if the node is an ArrayBindingPattern.
     * @param node - Node to check.
     */
    static isArrayBindingPattern(node: Node): node is ArrayBindingPattern;
    /**
     * Gets if the node is an ArrayLiteralExpression.
     * @param node - Node to check.
     */
    static isArrayLiteralExpression(node: Node): node is ArrayLiteralExpression;
    /**
     * Gets if the node is an ArrayTypeNode.
     * @param node - Node to check.
     */
    static isArrayTypeNode(node: Node): node is ArrayTypeNode;
    /**
     * Gets if the node is an ArrowFunction.
     * @param node - Node to check.
     */
    static isArrowFunction(node: Node): node is ArrowFunction;
    /**
     * Gets if the node is an AsExpression.
     * @param node - Node to check.
     */
    static isAsExpression(node: Node): node is AsExpression;
    /**
     * Gets if the node is an AsyncableNode.
     * @param node - Node to check.
     */
    static isAsyncableNode<T extends Node>(node: T): node is AsyncableNode & AsyncableNodeExtensionType & T;
    /**
     * Gets if the node is an AwaitExpression.
     * @param node - Node to check.
     */
    static isAwaitExpression(node: Node): node is AwaitExpression;
    /**
     * Gets if the node is an AwaitableNode.
     * @param node - Node to check.
     */
    static isAwaitableNode<T extends Node>(node: T): node is AwaitableNode & AwaitableNodeExtensionType & T;
    /**
     * Gets if the node is a BinaryExpression.
     * @param node - Node to check.
     */
    static isBinaryExpression(node: Node): node is BinaryExpression;
    /**
     * Gets if the node is a BindingElement.
     * @param node - Node to check.
     */
    static isBindingElement(node: Node): node is BindingElement;
    /**
     * Gets if the node is a BindingNamedNode.
     * @param node - Node to check.
     */
    static isBindingNamedNode<T extends Node>(node: T): node is BindingNamedNode & BindingNamedNodeExtensionType & T;
    /**
     * Gets if the node is a Block.
     * @param node - Node to check.
     */
    static isBlock(node: Node): node is Block;
    /**
     * Gets if the node is a BodiedNode.
     * @param node - Node to check.
     */
    static isBodiedNode<T extends Node>(node: T): node is BodiedNode & BodiedNodeExtensionType & T;
    /**
     * Gets if the node is a BodyableNode.
     * @param node - Node to check.
     */
    static isBodyableNode<T extends Node>(node: T): node is BodyableNode & BodyableNodeExtensionType & T;
    /**
     * Gets if the node is a BooleanKeyword.
     * @param node - Node to check.
     */
    static isBooleanKeyword(node: Node): node is Expression;
    /**
     * Gets if the node is a BooleanLiteral.
     * @param node - Node to check.
     */
    static isBooleanLiteral(node: Node): node is BooleanLiteral;
    /**
     * Gets if the node is a BreakStatement.
     * @param node - Node to check.
     */
    static isBreakStatement(node: Node): node is BreakStatement;
    /**
     * Gets if the node is a CallExpression.
     * @param node - Node to check.
     */
    static isCallExpression(node: Node): node is CallExpression;
    /**
     * Gets if the node is a CallSignatureDeclaration.
     * @param node - Node to check.
     */
    static isCallSignatureDeclaration(node: Node): node is CallSignatureDeclaration;
    /**
     * Gets if the node is a CaseBlock.
     * @param node - Node to check.
     */
    static isCaseBlock(node: Node): node is CaseBlock;
    /**
     * Gets if the node is a CaseClause.
     * @param node - Node to check.
     */
    static isCaseClause(node: Node): node is CaseClause;
    /**
     * Gets if the node is a CatchClause.
     * @param node - Node to check.
     */
    static isCatchClause(node: Node): node is CatchClause;
    /**
     * Gets if the node is a ChildOrderableNode.
     * @param node - Node to check.
     */
    static isChildOrderableNode<T extends Node>(node: T): node is ChildOrderableNode & ChildOrderableNodeExtensionType & T;
    /**
     * Gets if the node is a ClassDeclaration.
     * @param node - Node to check.
     */
    static isClassDeclaration(node: Node): node is ClassDeclaration;
    /**
     * Gets if the node is a ClassExpression.
     * @param node - Node to check.
     */
    static isClassExpression(node: Node): node is ClassExpression;
    /**
     * Gets if the node is a ClassLikeDeclarationBase.
     * @param node - Node to check.
     */
    static isClassLikeDeclarationBase<T extends Node>(node: T): node is ClassLikeDeclarationBase & ClassLikeDeclarationBaseExtensionType & T;
    /**
     * Gets if the node is a CommaListExpression.
     * @param node - Node to check.
     */
    static isCommaListExpression(node: Node): node is CommaListExpression;
    /**
     * Gets if the node is a ComputedPropertyName.
     * @param node - Node to check.
     */
    static isComputedPropertyName(node: Node): node is ComputedPropertyName;
    /**
     * Gets if the node is a ConditionalExpression.
     * @param node - Node to check.
     */
    static isConditionalExpression(node: Node): node is ConditionalExpression;
    /**
     * Gets if the node is a ConditionalTypeNode.
     * @param node - Node to check.
     */
    static isConditionalTypeNode(node: Node): node is ConditionalTypeNode;
    /**
     * Gets if the node is a ConstructSignatureDeclaration.
     * @param node - Node to check.
     */
    static isConstructSignatureDeclaration(node: Node): node is ConstructSignatureDeclaration;
    /**
     * Gets if the node is a ConstructorDeclaration.
     * @param node - Node to check.
     */
    static isConstructorDeclaration(node: Node): node is ConstructorDeclaration;
    /**
     * Gets if the node is a ConstructorTypeNode.
     * @param node - Node to check.
     */
    static isConstructorTypeNode(node: Node): node is ConstructorTypeNode;
    /**
     * Gets if the node is a ContinueStatement.
     * @param node - Node to check.
     */
    static isContinueStatement(node: Node): node is ContinueStatement;
    /**
     * Gets if the node is a DebuggerStatement.
     * @param node - Node to check.
     */
    static isDebuggerStatement(node: Node): node is DebuggerStatement;
    /**
     * Gets if the node is a DecoratableNode.
     * @param node - Node to check.
     */
    static isDecoratableNode<T extends Node>(node: T): node is DecoratableNode & DecoratableNodeExtensionType & T;
    /**
     * Gets if the node is a Decorator.
     * @param node - Node to check.
     */
    static isDecorator(node: Node): node is Decorator;
    /**
     * Gets if the node is a DefaultClause.
     * @param node - Node to check.
     */
    static isDefaultClause(node: Node): node is DefaultClause;
    /**
     * Gets if the node is a DeleteExpression.
     * @param node - Node to check.
     */
    static isDeleteExpression(node: Node): node is DeleteExpression;
    /**
     * Gets if the node is a DoStatement.
     * @param node - Node to check.
     */
    static isDoStatement(node: Node): node is DoStatement;
    /**
     * Gets if the node is an ElementAccessExpression.
     * @param node - Node to check.
     */
    static isElementAccessExpression(node: Node): node is ElementAccessExpression;
    /**
     * Gets if the node is an EmptyStatement.
     * @param node - Node to check.
     */
    static isEmptyStatement(node: Node): node is EmptyStatement;
    /**
     * Gets if the node is an EnumDeclaration.
     * @param node - Node to check.
     */
    static isEnumDeclaration(node: Node): node is EnumDeclaration;
    /**
     * Gets if the node is an EnumMember.
     * @param node - Node to check.
     */
    static isEnumMember(node: Node): node is EnumMember;
    /**
     * Gets if the node is an ExclamationTokenableNode.
     * @param node - Node to check.
     */
    static isExclamationTokenableNode<T extends Node>(node: T): node is ExclamationTokenableNode & ExclamationTokenableNodeExtensionType & T;
    /**
     * Gets if the node is an ExportAssignment.
     * @param node - Node to check.
     */
    static isExportAssignment(node: Node): node is ExportAssignment;
    /**
     * Gets if the node is an ExportDeclaration.
     * @param node - Node to check.
     */
    static isExportDeclaration(node: Node): node is ExportDeclaration;
    /**
     * Gets if the node is an ExportGetableNode.
     * @param node - Node to check.
     */
    static isExportGetableNode<T extends Node>(node: T): node is ExportGetableNode & ExportGetableNodeExtensionType & T;
    /**
     * Gets if the node is an ExportSpecifier.
     * @param node - Node to check.
     */
    static isExportSpecifier(node: Node): node is ExportSpecifier;
    /**
     * Gets if the node is an ExportableNode.
     * @param node - Node to check.
     */
    static isExportableNode<T extends Node>(node: T): node is ExportableNode & ExportableNodeExtensionType & T;
    /**
     * Gets if the node is an Expression.
     * @param node - Node to check.
     */
    static isExpression(node: Node): node is Expression;
    /**
     * Gets if the node is an ExpressionStatement.
     * @param node - Node to check.
     */
    static isExpressionStatement(node: Node): node is ExpressionStatement;
    /**
     * Gets if the node is an ExpressionWithTypeArguments.
     * @param node - Node to check.
     */
    static isExpressionWithTypeArguments(node: Node): node is ExpressionWithTypeArguments;
    /**
     * Gets if the node is an ExpressionedNode.
     * @param node - Node to check.
     */
    static isExpressionedNode<T extends Node>(node: T): node is ExpressionedNode & ExpressionedNodeExtensionType & T;
    /**
     * Gets if the node is an ExtendsClauseableNode.
     * @param node - Node to check.
     */
    static isExtendsClauseableNode<T extends Node>(node: T): node is ExtendsClauseableNode & ExtendsClauseableNodeExtensionType & T;
    /**
     * Gets if the node is an ExternalModuleReference.
     * @param node - Node to check.
     */
    static isExternalModuleReference(node: Node): node is ExternalModuleReference;
    /**
     * Gets if the node is a FalseKeyword.
     * @param node - Node to check.
     */
    static isFalseKeyword(node: Node): node is BooleanLiteral;
    /**
     * Gets if the node is a ForInStatement.
     * @param node - Node to check.
     */
    static isForInStatement(node: Node): node is ForInStatement;
    /**
     * Gets if the node is a ForOfStatement.
     * @param node - Node to check.
     */
    static isForOfStatement(node: Node): node is ForOfStatement;
    /**
     * Gets if the node is a ForStatement.
     * @param node - Node to check.
     */
    static isForStatement(node: Node): node is ForStatement;
    /**
     * Gets if the node is a FunctionDeclaration.
     * @param node - Node to check.
     */
    static isFunctionDeclaration(node: Node): node is FunctionDeclaration;
    /**
     * Gets if the node is a FunctionExpression.
     * @param node - Node to check.
     */
    static isFunctionExpression(node: Node): node is FunctionExpression;
    /**
     * Gets if the node is a FunctionLikeDeclaration.
     * @param node - Node to check.
     */
    static isFunctionLikeDeclaration<T extends Node>(node: T): node is FunctionLikeDeclaration & FunctionLikeDeclarationExtensionType & T;
    /**
     * Gets if the node is a FunctionTypeNode.
     * @param node - Node to check.
     */
    static isFunctionTypeNode(node: Node): node is FunctionTypeNode;
    /**
     * Gets if the node is a GeneratorableNode.
     * @param node - Node to check.
     */
    static isGeneratorableNode<T extends Node>(node: T): node is GeneratorableNode & GeneratorableNodeExtensionType & T;
    /**
     * Gets if the node is a GetAccessorDeclaration.
     * @param node - Node to check.
     */
    static isGetAccessorDeclaration(node: Node): node is GetAccessorDeclaration;
    /**
     * Gets if the node is a HeritageClause.
     * @param node - Node to check.
     */
    static isHeritageClause(node: Node): node is HeritageClause;
    /**
     * Gets if the node is a HeritageClauseableNode.
     * @param node - Node to check.
     */
    static isHeritageClauseableNode<T extends Node>(node: T): node is HeritageClauseableNode & HeritageClauseableNodeExtensionType & T;
    /**
     * Gets if the node is a Identifier.
     * @param node - Node to check.
     */
    static isIdentifier(node: Node): node is Identifier;
    /**
     * Gets if the node is a IfStatement.
     * @param node - Node to check.
     */
    static isIfStatement(node: Node): node is IfStatement;
    /**
     * Gets if the node is a ImplementsClauseableNode.
     * @param node - Node to check.
     */
    static isImplementsClauseableNode<T extends Node>(node: T): node is ImplementsClauseableNode & ImplementsClauseableNodeExtensionType & T;
    /**
     * Gets if the node is a ImportClause.
     * @param node - Node to check.
     */
    static isImportClause(node: Node): node is ImportClause;
    /**
     * Gets if the node is a ImportDeclaration.
     * @param node - Node to check.
     */
    static isImportDeclaration(node: Node): node is ImportDeclaration;
    /**
     * Gets if the node is a ImportEqualsDeclaration.
     * @param node - Node to check.
     */
    static isImportEqualsDeclaration(node: Node): node is ImportEqualsDeclaration;
    /**
     * Gets if the node is a ImportExpression.
     * @param node - Node to check.
     */
    static isImportExpression(node: Node): node is ImportExpression;
    /**
     * Gets if the node is a ImportSpecifier.
     * @param node - Node to check.
     */
    static isImportSpecifier(node: Node): node is ImportSpecifier;
    /**
     * Gets if the node is a ImportTypeNode.
     * @param node - Node to check.
     */
    static isImportTypeNode(node: Node): node is ImportTypeNode;
    /**
     * Gets if the node is a IndexSignatureDeclaration.
     * @param node - Node to check.
     */
    static isIndexSignatureDeclaration(node: Node): node is IndexSignatureDeclaration;
    /**
     * Gets if the node is a IndexedAccessTypeNode.
     * @param node - Node to check.
     */
    static isIndexedAccessTypeNode(node: Node): node is IndexedAccessTypeNode;
    /**
     * Gets if the node is a InferKeyword.
     * @param node - Node to check.
     */
    static isInferKeyword(node: Node): node is Node;
    /**
     * Gets if the node is a InferTypeNode.
     * @param node - Node to check.
     */
    static isInferTypeNode(node: Node): node is InferTypeNode;
    /**
     * Gets if the node is a InitializerExpressionGetableNode.
     * @param node - Node to check.
     */
    static isInitializerExpressionGetableNode<T extends Node>(node: T): node is InitializerExpressionGetableNode & InitializerExpressionGetableNodeExtensionType & T;
    /**
     * Gets if the node is a InitializerExpressionableNode.
     * @param node - Node to check.
     */
    static isInitializerExpressionableNode<T extends Node>(node: T): node is InitializerExpressionableNode & InitializerExpressionableNodeExtensionType & T;
    /**
     * Gets if the node is a InterfaceDeclaration.
     * @param node - Node to check.
     */
    static isInterfaceDeclaration(node: Node): node is InterfaceDeclaration;
    /**
     * Gets if the node is a IntersectionTypeNode.
     * @param node - Node to check.
     */
    static isIntersectionTypeNode(node: Node): node is IntersectionTypeNode;
    /**
     * Gets if the node is a IterationStatement.
     * @param node - Node to check.
     */
    static isIterationStatement(node: Node): node is IterationStatement;
    /**
     * Gets if the node is a JSDoc.
     * @param node - Node to check.
     */
    static isJSDoc(node: Node): node is JSDoc;
    /**
     * Gets if the node is a JSDocAugmentsTag.
     * @param node - Node to check.
     */
    static isJSDocAugmentsTag(node: Node): node is JSDocAugmentsTag;
    /**
     * Gets if the node is a JSDocClassTag.
     * @param node - Node to check.
     */
    static isJSDocClassTag(node: Node): node is JSDocClassTag;
    /**
     * Gets if the node is a JSDocFunctionType.
     * @param node - Node to check.
     */
    static isJSDocFunctionType(node: Node): node is JSDocFunctionType;
    /**
     * Gets if the node is a JSDocParameterTag.
     * @param node - Node to check.
     */
    static isJSDocParameterTag(node: Node): node is JSDocParameterTag;
    /**
     * Gets if the node is a JSDocPropertyLikeTag.
     * @param node - Node to check.
     */
    static isJSDocPropertyLikeTag<T extends Node>(node: T): node is JSDocPropertyLikeTag & JSDocPropertyLikeTagExtensionType & T;
    /**
     * Gets if the node is a JSDocPropertyTag.
     * @param node - Node to check.
     */
    static isJSDocPropertyTag(node: Node): node is JSDocPropertyTag;
    /**
     * Gets if the node is a JSDocReturnTag.
     * @param node - Node to check.
     */
    static isJSDocReturnTag(node: Node): node is JSDocReturnTag;
    /**
     * Gets if the node is a JSDocSignature.
     * @param node - Node to check.
     */
    static isJSDocSignature(node: Node): node is JSDocSignature;
    /**
     * Gets if the node is a JSDocTag.
     * @param node - Node to check.
     */
    static isJSDocTag(node: Node): node is JSDocTag;
    /**
     * Gets if the node is a JSDocType.
     * @param node - Node to check.
     */
    static isJSDocType(node: Node): node is JSDocType;
    /**
     * Gets if the node is a JSDocTypeExpression.
     * @param node - Node to check.
     */
    static isJSDocTypeExpression(node: Node): node is JSDocTypeExpression;
    /**
     * Gets if the node is a JSDocTypeTag.
     * @param node - Node to check.
     */
    static isJSDocTypeTag(node: Node): node is JSDocTypeTag;
    /**
     * Gets if the node is a JSDocTypedefTag.
     * @param node - Node to check.
     */
    static isJSDocTypedefTag(node: Node): node is JSDocTypedefTag;
    /**
     * Gets if the node is a JSDocUnknownTag.
     * @param node - Node to check.
     */
    static isJSDocUnknownTag(node: Node): node is JSDocUnknownTag;
    /**
     * Gets if the node is a JSDocableNode.
     * @param node - Node to check.
     */
    static isJSDocableNode<T extends Node>(node: T): node is JSDocableNode & JSDocableNodeExtensionType & T;
    /**
     * Gets if the node is a JsxAttribute.
     * @param node - Node to check.
     */
    static isJsxAttribute(node: Node): node is JsxAttribute;
    /**
     * Gets if the node is a JsxAttributedNode.
     * @param node - Node to check.
     */
    static isJsxAttributedNode<T extends Node>(node: T): node is JsxAttributedNode & JsxAttributedNodeExtensionType & T;
    /**
     * Gets if the node is a JsxClosingElement.
     * @param node - Node to check.
     */
    static isJsxClosingElement(node: Node): node is JsxClosingElement;
    /**
     * Gets if the node is a JsxClosingFragment.
     * @param node - Node to check.
     */
    static isJsxClosingFragment(node: Node): node is JsxClosingFragment;
    /**
     * Gets if the node is a JsxElement.
     * @param node - Node to check.
     */
    static isJsxElement(node: Node): node is JsxElement;
    /**
     * Gets if the node is a JsxExpression.
     * @param node - Node to check.
     */
    static isJsxExpression(node: Node): node is JsxExpression;
    /**
     * Gets if the node is a JsxFragment.
     * @param node - Node to check.
     */
    static isJsxFragment(node: Node): node is JsxFragment;
    /**
     * Gets if the node is a JsxOpeningElement.
     * @param node - Node to check.
     */
    static isJsxOpeningElement(node: Node): node is JsxOpeningElement;
    /**
     * Gets if the node is a JsxOpeningFragment.
     * @param node - Node to check.
     */
    static isJsxOpeningFragment(node: Node): node is JsxOpeningFragment;
    /**
     * Gets if the node is a JsxSelfClosingElement.
     * @param node - Node to check.
     */
    static isJsxSelfClosingElement(node: Node): node is JsxSelfClosingElement;
    /**
     * Gets if the node is a JsxSpreadAttribute.
     * @param node - Node to check.
     */
    static isJsxSpreadAttribute(node: Node): node is JsxSpreadAttribute;
    /**
     * Gets if the node is a JsxTagNamedNode.
     * @param node - Node to check.
     */
    static isJsxTagNamedNode<T extends Node>(node: T): node is JsxTagNamedNode & JsxTagNamedNodeExtensionType & T;
    /**
     * Gets if the node is a JsxText.
     * @param node - Node to check.
     */
    static isJsxText(node: Node): node is JsxText;
    /**
     * Gets if the node is a LabeledStatement.
     * @param node - Node to check.
     */
    static isLabeledStatement(node: Node): node is LabeledStatement;
    /**
     * Gets if the node is a LeftHandSideExpression.
     * @param node - Node to check.
     */
    static isLeftHandSideExpression(node: Node): node is LeftHandSideExpression;
    /**
     * Gets if the node is a LeftHandSideExpressionedNode.
     * @param node - Node to check.
     */
    static isLeftHandSideExpressionedNode<T extends Node>(node: T): node is LeftHandSideExpressionedNode & LeftHandSideExpressionedNodeExtensionType & T;
    /**
     * Gets if the node is a LiteralExpression.
     * @param node - Node to check.
     */
    static isLiteralExpression(node: Node): node is LiteralExpression;
    /**
     * Gets if the node is a LiteralLikeNode.
     * @param node - Node to check.
     */
    static isLiteralLikeNode<T extends Node>(node: T): node is LiteralLikeNode & LiteralLikeNodeExtensionType & T;
    /**
     * Gets if the node is a LiteralTypeNode.
     * @param node - Node to check.
     */
    static isLiteralTypeNode(node: Node): node is LiteralTypeNode;
    /**
     * Gets if the node is a MemberExpression.
     * @param node - Node to check.
     */
    static isMemberExpression(node: Node): node is MemberExpression;
    /**
     * Gets if the node is a MetaProperty.
     * @param node - Node to check.
     */
    static isMetaProperty(node: Node): node is MetaProperty;
    /**
     * Gets if the node is a MethodDeclaration.
     * @param node - Node to check.
     */
    static isMethodDeclaration(node: Node): node is MethodDeclaration;
    /**
     * Gets if the node is a MethodSignature.
     * @param node - Node to check.
     */
    static isMethodSignature(node: Node): node is MethodSignature;
    /**
     * Gets if the node is a ModifierableNode.
     * @param node - Node to check.
     */
    static isModifierableNode<T extends Node>(node: T): node is ModifierableNode & ModifierableNodeExtensionType & T;
    /**
     * Gets if the node is a ModuleBlock.
     * @param node - Node to check.
     */
    static isModuleBlock(node: Node): node is ModuleBlock;
    /**
     * Gets if the node is a ModuledNode.
     * @param node - Node to check.
     */
    static isModuledNode<T extends Node>(node: T): node is ModuledNode & ModuledNodeExtensionType & T;
    /**
     * Gets if the node is a NameableNode.
     * @param node - Node to check.
     */
    static isNameableNode<T extends Node>(node: T): node is NameableNode & NameableNodeExtensionType & T;
    /**
     * Gets if the node is a NamedExports.
     * @param node - Node to check.
     */
    static isNamedExports(node: Node): node is NamedExports;
    /**
     * Gets if the node is a NamedImports.
     * @param node - Node to check.
     */
    static isNamedImports(node: Node): node is NamedImports;
    /**
     * Gets if the node is a NamedNode.
     * @param node - Node to check.
     */
    static isNamedNode<T extends Node>(node: T): node is NamedNode & NamedNodeExtensionType & T;
    /**
     * Gets if the node is a NamespaceChildableNode.
     * @param node - Node to check.
     */
    static isNamespaceChildableNode<T extends Node>(node: T): node is NamespaceChildableNode & NamespaceChildableNodeExtensionType & T;
    /**
     * Gets if the node is a NamespaceDeclaration.
     * @param node - Node to check.
     */
    static isNamespaceDeclaration(node: Node): node is NamespaceDeclaration;
    /**
     * Gets if the node is a NamespaceImport.
     * @param node - Node to check.
     */
    static isNamespaceImport(node: Node): node is NamespaceImport;
    /**
     * Gets if the node is a NeverKeyword.
     * @param node - Node to check.
     */
    static isNeverKeyword(node: Node): node is Expression;
    /**
     * Gets if the node is a NewExpression.
     * @param node - Node to check.
     */
    static isNewExpression(node: Node): node is NewExpression;
    /**
     * Gets if the node is a NoSubstitutionTemplateLiteral.
     * @param node - Node to check.
     */
    static isNoSubstitutionTemplateLiteral(node: Node): node is NoSubstitutionTemplateLiteral;
    /**
     * Gets if the node is a NonNullExpression.
     * @param node - Node to check.
     */
    static isNonNullExpression(node: Node): node is NonNullExpression;
    /**
     * Gets if the node is a NotEmittedStatement.
     * @param node - Node to check.
     */
    static isNotEmittedStatement(node: Node): node is NotEmittedStatement;
    /**
     * Gets if the node is a NullLiteral.
     * @param node - Node to check.
     */
    static isNullLiteral(node: Node): node is NullLiteral;
    /**
     * Gets if the node is a NumberKeyword.
     * @param node - Node to check.
     */
    static isNumberKeyword(node: Node): node is Expression;
    /**
     * Gets if the node is a NumericLiteral.
     * @param node - Node to check.
     */
    static isNumericLiteral(node: Node): node is NumericLiteral;
    /**
     * Gets if the node is a ObjectBindingPattern.
     * @param node - Node to check.
     */
    static isObjectBindingPattern(node: Node): node is ObjectBindingPattern;
    /**
     * Gets if the node is a ObjectKeyword.
     * @param node - Node to check.
     */
    static isObjectKeyword(node: Node): node is Expression;
    /**
     * Gets if the node is a ObjectLiteralExpression.
     * @param node - Node to check.
     */
    static isObjectLiteralExpression(node: Node): node is ObjectLiteralExpression;
    /**
     * Gets if the node is a OmittedExpression.
     * @param node - Node to check.
     */
    static isOmittedExpression(node: Node): node is OmittedExpression;
    /**
     * Gets if the node is a OverloadableNode.
     * @param node - Node to check.
     */
    static isOverloadableNode<T extends Node>(node: T): node is OverloadableNode & OverloadableNodeExtensionType & T;
    /**
     * Gets if the node is a ParameterDeclaration.
     * @param node - Node to check.
     */
    static isParameterDeclaration(node: Node): node is ParameterDeclaration;
    /**
     * Gets if the node is a ParameteredNode.
     * @param node - Node to check.
     */
    static isParameteredNode<T extends Node>(node: T): node is ParameteredNode & ParameteredNodeExtensionType & T;
    /**
     * Gets if the node is a ParenthesizedExpression.
     * @param node - Node to check.
     */
    static isParenthesizedExpression(node: Node): node is ParenthesizedExpression;
    /**
     * Gets if the node is a ParenthesizedTypeNode.
     * @param node - Node to check.
     */
    static isParenthesizedTypeNode(node: Node): node is ParenthesizedTypeNode;
    /**
     * Gets if the node is a PartiallyEmittedExpression.
     * @param node - Node to check.
     */
    static isPartiallyEmittedExpression(node: Node): node is PartiallyEmittedExpression;
    /**
     * Gets if the node is a PostfixUnaryExpression.
     * @param node - Node to check.
     */
    static isPostfixUnaryExpression(node: Node): node is PostfixUnaryExpression;
    /**
     * Gets if the node is a PrefixUnaryExpression.
     * @param node - Node to check.
     */
    static isPrefixUnaryExpression(node: Node): node is PrefixUnaryExpression;
    /**
     * Gets if the node is a PrimaryExpression.
     * @param node - Node to check.
     */
    static isPrimaryExpression(node: Node): node is PrimaryExpression;
    /**
     * Gets if the node is a PropertyAccessExpression.
     * @param node - Node to check.
     */
    static isPropertyAccessExpression(node: Node): node is PropertyAccessExpression;
    /**
     * Gets if the node is a PropertyAssignment.
     * @param node - Node to check.
     */
    static isPropertyAssignment(node: Node): node is PropertyAssignment;
    /**
     * Gets if the node is a PropertyDeclaration.
     * @param node - Node to check.
     */
    static isPropertyDeclaration(node: Node): node is PropertyDeclaration;
    /**
     * Gets if the node is a PropertyNamedNode.
     * @param node - Node to check.
     */
    static isPropertyNamedNode<T extends Node>(node: T): node is PropertyNamedNode & PropertyNamedNodeExtensionType & T;
    /**
     * Gets if the node is a PropertySignature.
     * @param node - Node to check.
     */
    static isPropertySignature(node: Node): node is PropertySignature;
    /**
     * Gets if the node is a QualifiedName.
     * @param node - Node to check.
     */
    static isQualifiedName(node: Node): node is QualifiedName;
    /**
     * Gets if the node is a QuestionTokenableNode.
     * @param node - Node to check.
     */
    static isQuestionTokenableNode<T extends Node>(node: T): node is QuestionTokenableNode & QuestionTokenableNodeExtensionType & T;
    /**
     * Gets if the node is a ReadonlyableNode.
     * @param node - Node to check.
     */
    static isReadonlyableNode<T extends Node>(node: T): node is ReadonlyableNode & ReadonlyableNodeExtensionType & T;
    /**
     * Gets if the node is a ReferenceFindableNode.
     * @param node - Node to check.
     */
    static isReferenceFindableNode<T extends Node>(node: T): node is ReferenceFindableNode & ReferenceFindableNodeExtensionType & T;
    /**
     * Gets if the node is a RegularExpressionLiteral.
     * @param node - Node to check.
     */
    static isRegularExpressionLiteral(node: Node): node is RegularExpressionLiteral;
    /**
     * Gets if the node is a RenameableNode.
     * @param node - Node to check.
     */
    static isRenameableNode<T extends Node>(node: T): node is RenameableNode & RenameableNodeExtensionType & T;
    /**
     * Gets if the node is a ReturnStatement.
     * @param node - Node to check.
     */
    static isReturnStatement(node: Node): node is ReturnStatement;
    /**
     * Gets if the node is a ReturnTypedNode.
     * @param node - Node to check.
     */
    static isReturnTypedNode<T extends Node>(node: T): node is ReturnTypedNode & ReturnTypedNodeExtensionType & T;
    /**
     * Gets if the node is a ScopeableNode.
     * @param node - Node to check.
     */
    static isScopeableNode<T extends Node>(node: T): node is ScopeableNode & ScopeableNodeExtensionType & T;
    /**
     * Gets if the node is a ScopedNode.
     * @param node - Node to check.
     */
    static isScopedNode<T extends Node>(node: T): node is ScopedNode & ScopedNodeExtensionType & T;
    /**
     * Gets if the node is a SemicolonToken.
     * @param node - Node to check.
     */
    static isSemicolonToken(node: Node): node is Node;
    /**
     * Gets if the node is a SetAccessorDeclaration.
     * @param node - Node to check.
     */
    static isSetAccessorDeclaration(node: Node): node is SetAccessorDeclaration;
    /**
     * Gets if the node is a ShorthandPropertyAssignment.
     * @param node - Node to check.
     */
    static isShorthandPropertyAssignment(node: Node): node is ShorthandPropertyAssignment;
    /**
     * Gets if the node is a SignaturedDeclaration.
     * @param node - Node to check.
     */
    static isSignaturedDeclaration<T extends Node>(node: T): node is SignaturedDeclaration & SignaturedDeclarationExtensionType & T;
    /**
     * Gets if the node is a SourceFile.
     * @param node - Node to check.
     */
    static isSourceFile(node: Node): node is SourceFile;
    /**
     * Gets if the node is a SpreadAssignment.
     * @param node - Node to check.
     */
    static isSpreadAssignment(node: Node): node is SpreadAssignment;
    /**
     * Gets if the node is a SpreadElement.
     * @param node - Node to check.
     */
    static isSpreadElement(node: Node): node is SpreadElement;
    /**
     * Gets if the node is a Statement.
     * @param node - Node to check.
     */
    static isStatement(node: Node): node is Statement;
    /**
     * Gets if the node is a StatementedNode.
     * @param node - Node to check.
     */
    static isStatementedNode<T extends Node>(node: T): node is StatementedNode & StatementedNodeExtensionType & T;
    /**
     * Gets if the node is a StaticableNode.
     * @param node - Node to check.
     */
    static isStaticableNode<T extends Node>(node: T): node is StaticableNode & StaticableNodeExtensionType & T;
    /**
     * Gets if the node is a StringKeyword.
     * @param node - Node to check.
     */
    static isStringKeyword(node: Node): node is Expression;
    /**
     * Gets if the node is a StringLiteral.
     * @param node - Node to check.
     */
    static isStringLiteral(node: Node): node is StringLiteral;
    /**
     * Gets if the node is a SuperExpression.
     * @param node - Node to check.
     */
    static isSuperExpression(node: Node): node is SuperExpression;
    /**
     * Gets if the node is a SwitchStatement.
     * @param node - Node to check.
     */
    static isSwitchStatement(node: Node): node is SwitchStatement;
    /**
     * Gets if the node is a SymbolKeyword.
     * @param node - Node to check.
     */
    static isSymbolKeyword(node: Node): node is Expression;
    /**
     * Gets if the node is a SyntaxList.
     * @param node - Node to check.
     */
    static isSyntaxList(node: Node): node is SyntaxList;
    /**
     * Gets if the node is a TaggedTemplateExpression.
     * @param node - Node to check.
     */
    static isTaggedTemplateExpression(node: Node): node is TaggedTemplateExpression;
    /**
     * Gets if the node is a TemplateExpression.
     * @param node - Node to check.
     */
    static isTemplateExpression(node: Node): node is TemplateExpression;
    /**
     * Gets if the node is a TemplateHead.
     * @param node - Node to check.
     */
    static isTemplateHead(node: Node): node is TemplateHead;
    /**
     * Gets if the node is a TemplateMiddle.
     * @param node - Node to check.
     */
    static isTemplateMiddle(node: Node): node is TemplateMiddle;
    /**
     * Gets if the node is a TemplateSpan.
     * @param node - Node to check.
     */
    static isTemplateSpan(node: Node): node is TemplateSpan;
    /**
     * Gets if the node is a TemplateTail.
     * @param node - Node to check.
     */
    static isTemplateTail(node: Node): node is TemplateTail;
    /**
     * Gets if the node is a TextInsertableNode.
     * @param node - Node to check.
     */
    static isTextInsertableNode<T extends Node>(node: T): node is TextInsertableNode & TextInsertableNodeExtensionType & T;
    /**
     * Gets if the node is a ThisExpression.
     * @param node - Node to check.
     */
    static isThisExpression(node: Node): node is ThisExpression;
    /**
     * Gets if the node is a ThisTypeNode.
     * @param node - Node to check.
     */
    static isThisTypeNode(node: Node): node is ThisTypeNode;
    /**
     * Gets if the node is a ThrowStatement.
     * @param node - Node to check.
     */
    static isThrowStatement(node: Node): node is ThrowStatement;
    /**
     * Gets if the node is a TrueKeyword.
     * @param node - Node to check.
     */
    static isTrueKeyword(node: Node): node is BooleanLiteral;
    /**
     * Gets if the node is a TryStatement.
     * @param node - Node to check.
     */
    static isTryStatement(node: Node): node is TryStatement;
    /**
     * Gets if the node is a TupleTypeNode.
     * @param node - Node to check.
     */
    static isTupleTypeNode(node: Node): node is TupleTypeNode;
    /**
     * Gets if the node is a TypeAliasDeclaration.
     * @param node - Node to check.
     */
    static isTypeAliasDeclaration(node: Node): node is TypeAliasDeclaration;
    /**
     * Gets if the node is a TypeArgumentedNode.
     * @param node - Node to check.
     */
    static isTypeArgumentedNode<T extends Node>(node: T): node is TypeArgumentedNode & TypeArgumentedNodeExtensionType & T;
    /**
     * Gets if the node is a TypeAssertion.
     * @param node - Node to check.
     */
    static isTypeAssertion(node: Node): node is TypeAssertion;
    /**
     * Gets if the node is a TypeElement.
     * @param node - Node to check.
     */
    static isTypeElement(node: Node): node is TypeElement;
    /**
     * Gets if the node is a TypeElementMemberedNode.
     * @param node - Node to check.
     */
    static isTypeElementMemberedNode<T extends Node>(node: T): node is TypeElementMemberedNode & TypeElementMemberedNodeExtensionType & T;
    /**
     * Gets if the node is a TypeLiteralNode.
     * @param node - Node to check.
     */
    static isTypeLiteralNode(node: Node): node is TypeLiteralNode;
    /**
     * Gets if the node is a TypeNode.
     * @param node - Node to check.
     */
    static isTypeNode(node: Node): node is TypeNode;
    /**
     * Gets if the node is a TypeOfExpression.
     * @param node - Node to check.
     */
    static isTypeOfExpression(node: Node): node is TypeOfExpression;
    /**
     * Gets if the node is a TypeParameterDeclaration.
     * @param node - Node to check.
     */
    static isTypeParameterDeclaration(node: Node): node is TypeParameterDeclaration;
    /**
     * Gets if the node is a TypeParameteredNode.
     * @param node - Node to check.
     */
    static isTypeParameteredNode<T extends Node>(node: T): node is TypeParameteredNode & TypeParameteredNodeExtensionType & T;
    /**
     * Gets if the node is a TypeReferenceNode.
     * @param node - Node to check.
     */
    static isTypeReferenceNode(node: Node): node is TypeReferenceNode;
    /**
     * Gets if the node is a TypedNode.
     * @param node - Node to check.
     */
    static isTypedNode<T extends Node>(node: T): node is TypedNode & TypedNodeExtensionType & T;
    /**
     * Gets if the node is a UnaryExpression.
     * @param node - Node to check.
     */
    static isUnaryExpression(node: Node): node is UnaryExpression;
    /**
     * Gets if the node is a UnaryExpressionedNode.
     * @param node - Node to check.
     */
    static isUnaryExpressionedNode<T extends Node>(node: T): node is UnaryExpressionedNode & UnaryExpressionedNodeExtensionType & T;
    /**
     * Gets if the node is a UndefinedKeyword.
     * @param node - Node to check.
     */
    static isUndefinedKeyword(node: Node): node is Expression;
    /**
     * Gets if the node is a UnionTypeNode.
     * @param node - Node to check.
     */
    static isUnionTypeNode(node: Node): node is UnionTypeNode;
    /**
     * Gets if the node is a UnwrappableNode.
     * @param node - Node to check.
     */
    static isUnwrappableNode<T extends Node>(node: T): node is UnwrappableNode & UnwrappableNodeExtensionType & T;
    /**
     * Gets if the node is a UpdateExpression.
     * @param node - Node to check.
     */
    static isUpdateExpression(node: Node): node is UpdateExpression;
    /**
     * Gets if the node is a VariableDeclaration.
     * @param node - Node to check.
     */
    static isVariableDeclaration(node: Node): node is VariableDeclaration;
    /**
     * Gets if the node is a VariableDeclarationList.
     * @param node - Node to check.
     */
    static isVariableDeclarationList(node: Node): node is VariableDeclarationList;
    /**
     * Gets if the node is a VariableStatement.
     * @param node - Node to check.
     */
    static isVariableStatement(node: Node): node is VariableStatement;
    /**
     * Gets if the node is a VoidExpression.
     * @param node - Node to check.
     */
    static isVoidExpression(node: Node): node is VoidExpression;
    /**
     * Gets if the node is a WhileStatement.
     * @param node - Node to check.
     */
    static isWhileStatement(node: Node): node is WhileStatement;
    /**
     * Gets if the node is a WithStatement.
     * @param node - Node to check.
     */
    static isWithStatement(node: Node): node is WithStatement;
    /**
     * Gets if the node is a YieldExpression.
     * @param node - Node to check.
     */
    static isYieldExpression(node: Node): node is YieldExpression;
}

/**
 * Functions for writing code.
 */
export declare class Writers {
    private constructor();
    /**
     * Gets a writer function for writing the provided object as an object literal expression.
     * @param obj - Object to write.
     */
    static object(obj: {
            [key: string]: WriterFunctionOrValue | undefined;
        }): WriterFunction;
    /**
     * Gets a writer function for writing an object type.
     */
    static objectType(structure: TypeElementMemberedNodeStructure): WriterFunction;
    /**
     * Gets a writer function for writing a union type (ex. `FirstType | SecondType`).
     */
    static unionType(firstType: WriterFunctionOrValue, secondType: WriterFunctionOrValue, ...additionalTypes: WriterFunctionOrValue[]): (writer: CodeBlockWriter) => void;
    /**
     * Gets a writer function for writing an intersection type (ex. `FirstType & SecondType`).
     */
    static intersectionType(firstType: WriterFunctionOrValue, secondType: WriterFunctionOrValue, ...additionalTypes: WriterFunctionOrValue[]): (writer: CodeBlockWriter) => void;
    /**
     * Gets a writer function for writing a type assertion (ex. `type as assertionType`).
     */
    static assertion(type: WriterFunctionOrValue, assertionType: WriterFunctionOrValue): (writer: CodeBlockWriter) => void;
    /**
     * Gets a writer function for writing a return statement returning the provided value (ex. `return value;`).
     * @param value - Value to be returned.
     */
    static returnStatement(value: WriterFunctionOrValue): WriterFunction;
}

/**
 * @deprecated Use `Writers`.
 */
declare const WriterFunctions: typeof Writers;
export declare type WriterFunctionOrValue = string | number | WriterFunction;
export declare type PropertyName = Identifier | StringLiteral | NumericLiteral | ComputedPropertyName;
export declare type AccessorDeclaration = GetAccessorDeclaration | SetAccessorDeclaration;
export declare type ArrayBindingElement = BindingElement | OmittedExpression;
export declare type BindingName = Identifier | BindingPattern;
export declare type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;
export declare type CallLikeExpression = CallExpression | NewExpression | TaggedTemplateExpression | Decorator | JsxOpeningLikeElement;
export declare type DeclarationName = Identifier | StringLiteralLike | NumericLiteral | ComputedPropertyName | BindingPattern;
export declare type EntityName = Identifier | QualifiedName;
export declare type JsxChild = JsxText | JsxExpression | JsxElement | JsxSelfClosingElement | JsxFragment;
export declare type JsxAttributeLike = JsxAttribute | JsxSpreadAttribute;
export declare type JsxOpeningLikeElement = JsxSelfClosingElement | JsxOpeningElement;
export declare type JsxTagNameExpression = Identifier | ThisExpression | JsxTagNamePropertyAccess;

export interface JsxTagNamePropertyAccess extends PropertyAccessExpression {
    getExpression(): JsxTagNameExpression;
}

export declare type ObjectLiteralElementLike = PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | MethodDeclaration | AccessorDeclaration;
export declare type CaseOrDefaultClause = CaseClause | DefaultClause;
export declare type ModuleReference = EntityName | ExternalModuleReference;
export declare type StringLiteralLike = StringLiteral | NoSubstitutionTemplateLiteral;
export declare type TypeElementTypes = PropertySignature | MethodSignature | ConstructSignatureDeclaration | CallSignatureDeclaration | IndexSignatureDeclaration;
export declare type TemplateLiteral = TemplateExpression | NoSubstitutionTemplateLiteral;
/**
 * Local target declarations.
 * @remarks This may be missing some types. Please open an issue if this returns a type not listed here.
 */
export declare type LocalTargetDeclarations = SourceFile | ClassDeclaration | InterfaceDeclaration | EnumDeclaration | FunctionDeclaration | VariableDeclaration | TypeAliasDeclaration | NamespaceDeclaration | ExportAssignment;
/**
 * Declarations that can be exported from a module.
 * @remarks This may be missing some types. Please open an issue if this returns a type not listed here.
 */
export declare type ExportedDeclarations = ClassDeclaration | InterfaceDeclaration | EnumDeclaration | FunctionDeclaration | VariableDeclaration | TypeAliasDeclaration | NamespaceDeclaration | Expression;
export declare function AmbientableNode<T extends Constructor<AmbientableNodeExtensionType>>(Base: T): Constructor<AmbientableNode> & T;

export interface AmbientableNode {
    /**
     * If the node has the declare keyword.
     */
    hasDeclareKeyword(): boolean;
    /**
     * Gets the declare keyword or undefined if none exists.
     */
    getDeclareKeyword(): Node | undefined;
    /**
     * Gets the declare keyword or throws if it doesn't exist.
     */
    getDeclareKeywordOrThrow(): Node;
    /**
     * Gets if the node is ambient.
     */
    isAmbient(): boolean;
    /**
     * Sets if this node has a declare keyword.
     * @param value - To add the declare keyword or not.
     */
    setHasDeclareKeyword(value?: boolean): this;
}

declare type AmbientableNodeExtensionType = Node & ModifierableNode;
export declare function ArgumentedNode<T extends Constructor<ArgumentedNodeExtensionType>>(Base: T): Constructor<ArgumentedNode> & T;

export interface ArgumentedNode {
    /**
     * Gets all the arguments of the node.
     */
    getArguments(): Node[];
    /**
     * Adds an argument.
     * @param argumentText - Argument text to add.
     */
    addArgument(argumentText: string | WriterFunction): Node;
    /**
     * Adds arguments.
     * @param argumentTexts - Argument texts to add.
     */
    addArguments(argumentTexts: ReadonlyArray<string | WriterFunction> | WriterFunction): Node[];
    /**
     * Inserts an argument.
     * @param index - Child index to insert at.
     * @param argumentText - Argument text to insert.
     */
    insertArgument(index: number, argumentText: string | WriterFunction): Node;
    /**
     * Inserts arguments.
     * @param index - Child index to insert at.
     * @param argumentTexts - Argument texts to insert.
     */
    insertArguments(index: number, argumentTexts: ReadonlyArray<string | WriterFunction> | WriterFunction): Node[];
    /**
     * Removes an argument.
     * @param arg - Argument to remove.
     */
    removeArgument(arg: Node): this;
    /**
     * Removes an argument.
     * @param index - Index to remove.
     */
    removeArgument(index: number): this;
}

declare type ArgumentedNodeExtensionType = Node<ts.Node & {
        arguments: ts.NodeArray<ts.Node>;
    }>;
export declare function AsyncableNode<T extends Constructor<AsyncableNodeExtensionType>>(Base: T): Constructor<AsyncableNode> & T;

export interface AsyncableNode {
    /**
     * If it's async.
     */
    isAsync(): boolean;
    /**
     * Gets the async keyword or undefined if none exists.
     */
    getAsyncKeyword(): Node<ts.Modifier> | undefined;
    /**
     * Gets the async keyword or throws if none exists.
     */
    getAsyncKeywordOrThrow(): Node<ts.Modifier>;
    /**
     * Sets if the node is async.
     * @param value - If it should be async or not.
     */
    setIsAsync(value: boolean): this;
}

declare type AsyncableNodeExtensionType = Node & ModifierableNode;
export declare function AwaitableNode<T extends Constructor<AwaitableNodeExtensionType>>(Base: T): Constructor<AwaitableNode> & T;

export interface AwaitableNode {
    /**
     * If it's an awaited node.
     */
    isAwaited(): boolean;
    /**
     * Gets the await token or undefined if none exists.
     */
    getAwaitKeyword(): Node<ts.AwaitKeywordToken> | undefined;
    /**
     * Gets the await token or throws if none exists.
     */
    getAwaitKeywordOrThrow(): Node<ts.AwaitKeywordToken>;
    /**
     * Sets if the node is awaited.
     * @param value - If it should be awaited or not.
     */
    setIsAwaited(value: boolean): this;
}

declare type AwaitableNodeExtensionType = Node<ts.Node & {
        awaitModifier?: ts.AwaitKeywordToken;
    }>;
export declare function BodiedNode<T extends Constructor<BodiedNodeExtensionType>>(Base: T): Constructor<BodiedNode> & T;

export interface BodiedNode {
    /**
     * Gets the body.
     */
    getBody(): Node;
    /**
     * Sets the body text.
     * @param textOrWriterFunction - Text or writer function to set as the body.
     */
    setBodyText(textOrWriterFunction: string | WriterFunction): this;
    /**
     * Gets the body text without leading whitespace, leading indentation, or trailing whitespace.
     */
    getBodyText(): string;
}

declare type BodiedNodeExtensionType = Node<ts.Node & {
        body: ts.Node;
    }>;
export declare function BodyableNode<T extends Constructor<BodyableNodeExtensionType>>(Base: T): Constructor<BodyableNode> & T;

export interface BodyableNode {
    /**
     * Gets the body or throws an error if it doesn't exist.
     */
    getBodyOrThrow(): Node;
    /**
     * Gets the body if it exists.
     */
    getBody(): Node | undefined;
    /**
     * Gets the body text without leading whitespace, leading indentation, or trailing whitespace. Returns undefined if there is no body.
     */
    getBodyText(): string | undefined;
    /**
     * Gets if the node has a body.
     */
    hasBody(): boolean;
    /**
     * Sets the body text. A body is required to do this operation.
     * @param textOrWriterFunction - Text or writer function to set as the body.
     */
    setBodyText(textOrWriterFunction: string | WriterFunction): this;
    /**
     * Adds a body if it doesn't exists.
     */
    addBody(): this;
    /**
     * Removes the body if it exists.
     */
    removeBody(): this;
}

declare type BodyableNodeExtensionType = Node<ts.Node & {
        body?: ts.Node;
    }>;
export declare function ChildOrderableNode<T extends Constructor<ChildOrderableNodeExtensionType>>(Base: T): Constructor<ChildOrderableNode> & T;

export interface ChildOrderableNode {
    /**
     * Sets the child order of the node within the parent.
     */
    setOrder(order: number): this;
}

declare type ChildOrderableNodeExtensionType = Node;
export declare function DecoratableNode<T extends Constructor<DecoratableNodeExtensionType>>(Base: T): Constructor<DecoratableNode> & T;

export interface DecoratableNode {
    /**
     * Gets a decorator or undefined if it doesn't exist.
     * @param name - Name of the parameter.
     */
    getDecorator(name: string): Decorator | undefined;
    /**
     * Gets a decorator or undefined if it doesn't exist.
     * @param findFunction - Function to use to find the parameter.
     */
    getDecorator(findFunction: (declaration: Decorator) => boolean): Decorator | undefined;
    /**
     * Gets a decorator or throws if it doesn't exist.
     * @param name - Name of the parameter.
     */
    getDecoratorOrThrow(name: string): Decorator;
    /**
     * Gets a decorator or throws if it doesn't exist.
     * @param findFunction - Function to use to find the parameter.
     */
    getDecoratorOrThrow(findFunction: (declaration: Decorator) => boolean): Decorator;
    /**
     * Gets all the decorators of the node.
     */
    getDecorators(): Decorator[];
    /**
     * Adds a decorator.
     * @param structure - Structure of the decorator.
     */
    addDecorator(structure: OptionalKind<DecoratorStructure>): Decorator;
    /**
     * Adds decorators.
     * @param structures - Structures of the decorators.
     */
    addDecorators(structures: ReadonlyArray<OptionalKind<DecoratorStructure>>): Decorator[];
    /**
     * Inserts a decorator.
     * @param index - Child index to insert at. Specify a negative index to insert from the reverse.
     * @param structure - Structure of the decorator.
     */
    insertDecorator(index: number, structure: OptionalKind<DecoratorStructure>): Decorator;
    /**
     * Insert decorators.
     * @param index - Child index to insert at.
     * @param structures - Structures to insert.
     */
    insertDecorators(index: number, structures: ReadonlyArray<OptionalKind<DecoratorStructure>>): Decorator[];
}

declare type DecoratableNodeExtensionType = Node<ts.Node>;
export declare function ExclamationTokenableNode<T extends Constructor<ExclamationTokenableNodeExtensionType>>(Base: T): Constructor<ExclamationTokenableNode> & T;

export interface ExclamationTokenableNode {
    /**
     * If it has a exclamation token.
     */
    hasExclamationToken(): boolean;
    /**
     * Gets the exclamation token node or returns undefined if it doesn't exist.
     */
    getExclamationTokenNode(): Node<ts.ExclamationToken> | undefined;
    /**
     * Gets the exclamation token node or throws.
     */
    getExclamationTokenNodeOrThrow(): Node<ts.ExclamationToken>;
    /**
     * Sets if this node has a exclamation token.
     * @param value - If it should have a exclamation token or not.
     */
    setHasExclamationToken(value: boolean): this;
}

declare type ExclamationTokenableNodeExtensionType = Node<ts.Node & {
        exclamationToken?: ts.ExclamationToken;
    }>;
export declare function ExportableNode<T extends Constructor<ExportableNodeExtensionType>>(Base: T): Constructor<ExportableNode> & T;

export interface ExportableNode extends ExportGetableNode {
    /**
     * Sets if this node is a default export of a file.
     * @param value - If it should be a default export or not.
     */
    setIsDefaultExport(value: boolean): this;
    /**
     * Sets if the node is exported.
     *
     * Note: Will remove the default keyword if set.
     * @param value - If it should be exported or not.
     */
    setIsExported(value: boolean): this;
}

declare type ExportableNodeExtensionType = Node & ModifierableNode;
export declare function ExportGetableNode<T extends Constructor<ExportGetableNodeExtensionType>>(Base: T): Constructor<ExportGetableNode> & T;

export interface ExportGetableNode {
    /**
     * If the node has the export keyword.
     */
    hasExportKeyword(): boolean;
    /**
     * Gets the export keyword or undefined if none exists.
     */
    getExportKeyword(): Node | undefined;
    /**
     * Gets the export keyword or throws if none exists.
     */
    getExportKeywordOrThrow(): Node;
    /**
     * If the node has the default keyword.
     */
    hasDefaultKeyword(): boolean;
    /**
     * Gets the default keyword or undefined if none exists.
     */
    getDefaultKeyword(): Node | undefined;
    /**
     * Gets the default keyword or throws if none exists.
     */
    getDefaultKeywordOrThrow(): Node;
    /**
     * Gets if the node is exported from a namespace, is a default export, or is a named export.
     */
    isExported(): boolean;
    /**
     * Gets if this node is a default export of a file.
     */
    isDefaultExport(): boolean;
    /**
     * Gets if this node is a named export of a file.
     */
    isNamedExport(): boolean;
}

declare type ExportGetableNodeExtensionType = Node;
export declare function ExtendsClauseableNode<T extends Constructor<ExtendsClauseableNodeExtensionType>>(Base: T): Constructor<ExtendsClauseableNode> & T;

export interface ExtendsClauseableNode {
    /**
     * Gets the extends clauses.
     */
    getExtends(): ExpressionWithTypeArguments[];
    /**
     * Adds multiple extends clauses.
     * @param texts - Texts to add for the extends clause.
     */
    addExtends(texts: ReadonlyArray<string | WriterFunction> | WriterFunction): ExpressionWithTypeArguments[];
    /**
     * Adds an extends clause.
     * @param text - Text to add for the extends clause.
     */
    addExtends(text: string): ExpressionWithTypeArguments;
    /**
     * Inserts multiple extends clauses.
     * @param texts - Texts to insert for the extends clause.
     */
    insertExtends(index: number, texts: ReadonlyArray<string | WriterFunction> | WriterFunction): ExpressionWithTypeArguments[];
    /**
     * Inserts an extends clause.
     * @param text - Text to insert for the extends clause.
     */
    insertExtends(index: number, text: string): ExpressionWithTypeArguments;
    /**
     * Removes the extends at the specified index.
     * @param index - Index to remove.
     */
    removeExtends(index: number): this;
    /**
     * Removes the specified extends.
     * @param extendsNode - Node of the extend to remove.
     */
    removeExtends(extendsNode: ExpressionWithTypeArguments): this;
}

declare type ExtendsClauseableNodeExtensionType = Node & HeritageClauseableNode;
export declare function GeneratorableNode<T extends Constructor<GeneratorableNodeExtensionType>>(Base: T): Constructor<GeneratorableNode> & T;

export interface GeneratorableNode {
    /**
     * If it's a generator function.
     */
    isGenerator(): boolean;
    /**
     * Gets the asterisk token or undefined if none exists.
     */
    getAsteriskToken(): Node<ts.AsteriskToken> | undefined;
    /**
     * Gets the asterisk token or throws if none exists.
     */
    getAsteriskTokenOrThrow(): Node<ts.AsteriskToken>;
    /**
     * Sets if the node is a generator.
     * @param value - If it should be a generator or not.
     */
    setIsGenerator(value: boolean): this;
}

declare type GeneratorableNodeExtensionType = Node<ts.Node & {
        asteriskToken?: ts.AsteriskToken;
    }>;
export declare function HeritageClauseableNode<T extends Constructor<HeritageClauseableNodeExtensionType>>(Base: T): Constructor<HeritageClauseableNode> & T;

export interface HeritageClauseableNode {
    /**
     * Gets the heritage clauses of the node.
     */
    getHeritageClauses(): HeritageClause[];
    /**
     * Gets the heritage clause by kind.
     * @kind - Kind of heritage clause.
     */
    getHeritageClauseByKind(kind: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword): HeritageClause | undefined;
    /**
     * Gets the heritage clause by kind or throws if it doesn't exist.
     * @kind - Kind of heritage clause.
     */
    getHeritageClauseByKindOrThrow(kind: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword): HeritageClause;
}

declare type HeritageClauseableNodeExtensionType = Node<ts.Node & {
        heritageClauses?: ts.NodeArray<ts.HeritageClause>;
    }>;
export declare function ImplementsClauseableNode<T extends Constructor<ImplementsClauseableNodeExtensionType>>(Base: T): Constructor<ImplementsClauseableNode> & T;

export interface ImplementsClauseableNode {
    /**
     * Gets the implements clauses.
     */
    getImplements(): ExpressionWithTypeArguments[];
    /**
     * Adds an implements clause.
     * @param text - Text to add for the implements clause.
     */
    addImplements(text: string): ExpressionWithTypeArguments;
    /**
     * Adds multiple implements clauses.
     * @param text - Texts to add for the implements clause.
     */
    addImplements(text: ReadonlyArray<string | WriterFunction> | WriterFunction): ExpressionWithTypeArguments[];
    /**
     * Inserts an implements clause.
     * @param text - Text to insert for the implements clause.
     */
    insertImplements(index: number, texts: ReadonlyArray<string | WriterFunction> | WriterFunction): ExpressionWithTypeArguments[];
    /**
     * Inserts multiple implements clauses.
     * @param text - Texts to insert for the implements clause.
     */
    insertImplements(index: number, text: string): ExpressionWithTypeArguments;
    /**
     * Removes the implements at the specified index.
     * @param index - Index to remove.
     */
    removeImplements(index: number): this;
    /**
     * Removes the specified implements.
     * @param implementsNode - Node of the implements to remove.
     */
    removeImplements(implementsNode: ExpressionWithTypeArguments): this;
}

declare type ImplementsClauseableNodeExtensionType = Node & HeritageClauseableNode;
export declare function InitializerExpressionableNode<T extends Constructor<InitializerExpressionableNodeExtensionType>>(Base: T): Constructor<InitializerExpressionableNode> & T;

export interface InitializerExpressionableNode extends InitializerExpressionGetableNode {
    /**
     * Removes the initailizer.
     */
    removeInitializer(): this;
    /**
     * Sets the initializer.
     * @param text - Text or writer function to set for the initializer.
     */
    setInitializer(textOrWriterFunction: string | WriterFunction): this;
}

declare type InitializerExpressionableNodeExtensionType = Node<ts.Node & {
        initializer?: ts.Expression;
    }>;
export declare function InitializerExpressionGetableNode<T extends Constructor<InitializerExpressionGetableNodeExtensionType>>(Base: T): Constructor<InitializerExpressionGetableNode> & T;

export interface InitializerExpressionGetableNode {
    /**
     * Gets if node has an initializer.
     */
    hasInitializer(): boolean;
    /**
     * Gets the initializer.
     */
    getInitializer(): Expression | undefined;
    /**
     * Gets the initializer if it's a certain kind or throws.
     */
    getInitializerIfKindOrThrow<TKind extends SyntaxKind>(kind: TKind): KindToExpressionMappings[TKind];
    /**
     * Gets the initializer if it's a certain kind.
     */
    getInitializerIfKind<TKind extends SyntaxKind>(kind: TKind): KindToExpressionMappings[TKind] | undefined;
    /**
     * Gets the initializer or throw.
     */
    getInitializerOrThrow(): Expression;
}

declare type InitializerExpressionGetableNodeExtensionType = Node<ts.Node & {
        initializer?: ts.Expression;
    }>;
export declare function JSDocableNode<T extends Constructor<JSDocableNodeExtensionType>>(Base: T): Constructor<JSDocableNode> & T;

export interface JSDocableNode {
    /**
     * Gets the JS doc nodes.
     */
    getJsDocs(): JSDoc[];
    /**
     * Adds a JS doc.
     * @param structure - Structure to add.
     */
    addJsDoc(structure: OptionalKind<JSDocStructure> | string | WriterFunction): JSDoc;
    /**
     * Adds JS docs.
     * @param structures - Structures to add.
     */
    addJsDocs(structures: ReadonlyArray<OptionalKind<JSDocStructure> | string | WriterFunction>): JSDoc[];
    /**
     * Inserts a JS doc.
     * @param index - Child index to insert at.
     * @param structure - Structure to insert.
     */
    insertJsDoc(index: number, structure: OptionalKind<JSDocStructure> | string | WriterFunction): JSDoc;
    /**
     * Inserts JS docs.
     * @param index - Child index to insert at.
     * @param structures - Structures to insert.
     */
    insertJsDocs(index: number, structures: ReadonlyArray<OptionalKind<JSDocStructure> | string | WriterFunction>): JSDoc[];
}

declare type JSDocableNodeExtensionType = Node<ts.Node & {
        jsDoc?: ts.NodeArray<ts.JSDoc>;
    }>;
export declare function LiteralLikeNode<T extends Constructor<LiteralLikeNodeExtensionType>>(Base: T): Constructor<LiteralLikeNode> & T;

export interface LiteralLikeNode {
    /**
     * Get text of the literal.
     */
    getLiteralText(): string;
    /**
     * Gets if the literal is terminated.
     */
    isTerminated(): boolean;
    /**
     * Gets if the literal has an extended unicode escape.
     */
    hasExtendedUnicodeEscape(): boolean;
}

declare type LiteralLikeNodeExtensionType = Node<ts.LiteralLikeNode>;
export declare function ModifierableNode<T extends Constructor<ModifierableNodeExtensionType>>(Base: T): Constructor<ModifierableNode> & T;

export interface ModifierableNode {
    /**
     * Gets the node's modifiers.
     */
    getModifiers(): Node[];
    /**
     * Gets the first modifier of the specified syntax kind or throws if none found.
     * @param kind - Syntax kind.
     */
    getFirstModifierByKindOrThrow<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind];
    /**
     * Gets the first modifier of the specified syntax kind or undefined if none found.
     * @param kind - Syntax kind.
     */
    getFirstModifierByKind<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind] | undefined;
    /**
     * Gets if it has the specified modifier.
     * @param kind - Syntax kind to check for.
     */
    hasModifier(kind: SyntaxKind): boolean;
    /**
     * Gets if it has the specified modifier.
     * @param text - Text to check for.
     */
    hasModifier(text: ModifierTexts): boolean;
    /**
     * Toggles a modifier.
     * @param text - Text to toggle the modifier for.
     * @param value - Optional toggling value.
     */
    toggleModifier(text: ModifierTexts, value?: boolean): this;
}

declare type ModifierableNodeExtensionType = Node;
export declare type ModifierTexts = "export" | "default" | "declare" | "abstract" | "public" | "protected" | "private" | "readonly" | "static" | "async" | "const";
export declare function ModuledNode<T extends Constructor<ModuledNodeExtensionType>>(Base: T): Constructor<ModuledNode> & T;

export interface ModuledNode {
    /**
     * Adds an import.
     * @param structure - Structure that represents the import.
     */
    addImportDeclaration(structure: OptionalKind<ImportDeclarationStructure>): ImportDeclaration;
    /**
     * Adds imports.
     * @param structures - Structures that represent the imports.
     */
    addImportDeclarations(structures: ReadonlyArray<OptionalKind<ImportDeclarationStructure>>): ImportDeclaration[];
    /**
     * Insert an import.
     * @param index - Child index to insert at.
     * @param structure - Structure that represents the import.
     */
    insertImportDeclaration(index: number, structure: OptionalKind<ImportDeclarationStructure>): ImportDeclaration;
    /**
     * Inserts imports.
     * @param index - Child index to insert at.
     * @param structures - Structures that represent the imports to insert.
     */
    insertImportDeclarations(index: number, structures: ReadonlyArray<OptionalKind<ImportDeclarationStructure>>): ImportDeclaration[];
    /**
     * Gets the first import declaration that matches a condition, or undefined if it doesn't exist.
     * @param condition - Condition to get the import declaration by.
     */
    getImportDeclaration(condition: (importDeclaration: ImportDeclaration) => boolean): ImportDeclaration | undefined;
    /**
     * Gets the first import declaration that matches a module specifier, or undefined if it doesn't exist.
     * @param module - Module specifier to get the import declaration by.
     */
    getImportDeclaration(moduleSpecifier: string): ImportDeclaration | undefined;
    /**
     * Gets the first import declaration that matches a condition, or throws if it doesn't exist.
     * @param condition - Condition to get the import declaration by.
     */
    getImportDeclarationOrThrow(condition: (importDeclaration: ImportDeclaration) => boolean): ImportDeclaration;
    /**
     * Gets the first import declaration that matches a module specifier, or throws if it doesn't exist.
     * @param module - Module specifier to get the import declaration by.
     */
    getImportDeclarationOrThrow(moduleSpecifier: string): ImportDeclaration;
    /**
     * Get the module's import declarations.
     */
    getImportDeclarations(): ImportDeclaration[];
    /**
     * Add export declarations.
     * @param structure - Structure that represents the export.
     */
    addExportDeclaration(structure: OptionalKind<ExportDeclarationStructure>): ExportDeclaration;
    /**
     * Add export declarations.
     * @param structures - Structures that represent the exports.
     */
    addExportDeclarations(structures: ReadonlyArray<OptionalKind<ExportDeclarationStructure>>): ExportDeclaration[];
    /**
     * Insert an export declaration.
     * @param index - Child index to insert at.
     * @param structure - Structure that represents the export.
     */
    insertExportDeclaration(index: number, structure: OptionalKind<ExportDeclarationStructure>): ExportDeclaration;
    /**
     * Insert export declarations.
     * @param index - Child index to insert at.
     * @param structures - Structures that represent the exports to insert.
     */
    insertExportDeclarations(index: number, structures: ReadonlyArray<OptionalKind<ExportDeclarationStructure>>): ExportDeclaration[];
    getExportDeclaration(condition: (exportDeclaration: ExportDeclaration) => boolean): ExportDeclaration | undefined;
    /**
     * Gets the first export declaration that matches a module specifier, or undefined if it doesn't exist.
     * @param module - Module specifier to get the export declaration by.
     */
    getExportDeclaration(moduleSpecifier: string): ExportDeclaration | undefined;
    /**
     * Gets the first export declaration that matches a condition, or throws if it doesn't exist.
     * @param condition - Condition to get the export declaration by.
     */
    getExportDeclarationOrThrow(condition: (exportDeclaration: ExportDeclaration) => boolean): ExportDeclaration;
    /**
     * Gets the first export declaration that matches a module specifier, or throws if it doesn't exist.
     * @param module - Module specifier to get the export declaration by.
     */
    getExportDeclarationOrThrow(moduleSpecifier: string): ExportDeclaration;
    /**
     * Get the export declarations.
     */
    getExportDeclarations(): ExportDeclaration[];
    /**
     * Add export assignments.
     * @param structure - Structure that represents the export.
     */
    addExportAssignment(structure: OptionalKind<ExportAssignmentStructure>): ExportAssignment;
    /**
     * Add export assignments.
     * @param structures - Structures that represent the exports.
     */
    addExportAssignments(structures: ReadonlyArray<OptionalKind<ExportAssignmentStructure>>): ExportAssignment[];
    /**
     * Insert an export assignment.
     * @param index - Child index to insert at.
     * @param structure - Structure that represents the export.
     */
    insertExportAssignment(index: number, structure: OptionalKind<ExportAssignmentStructure>): ExportAssignment;
    /**
     * Insert export assignments into a file.
     * @param index - Child index to insert at.
     * @param structures - Structures that represent the exports to insert.
     */
    insertExportAssignments(index: number, structures: ReadonlyArray<OptionalKind<ExportAssignmentStructure>>): ExportAssignment[];
    /**
     * Gets the first export assignment that matches a condition, or undefined if it doesn't exist.
     * @param condition - Condition to get the export assignment by.
     */
    getExportAssignment(condition: (exportAssignment: ExportAssignment) => boolean): ExportAssignment | undefined;
    /**
     * Gets the first export assignment that matches a condition, or throws if it doesn't exist.
     * @param condition - Condition to get the export assignment by.
     */
    getExportAssignmentOrThrow(condition: (exportAssignment: ExportAssignment) => boolean): ExportAssignment;
    /**
     * Get the file's export assignments.
     */
    getExportAssignments(): ExportAssignment[];
    /**
     * Gets the default export symbol.
     */
    getDefaultExportSymbol(): Symbol | undefined;
    /**
     * Gets the default export symbol or throws if it doesn't exist.
     */
    getDefaultExportSymbolOrThrow(): Symbol;
    /**
     * Gets the export symbols.
     */
    getExportSymbols(): Symbol[];
    /**
     * Gets all the declarations that are exported from the module.
     *
     * The key is the name it's exported on and the value is the array of declarations for that name.
     *
     * This will include declarations that are transitively exported from other modules. If you mean to get the export
     * declarations then use `.getExportDeclarations()`.
     */
    getExportedDeclarations(): ReadonlyMap<string, ExportedDeclarations[]>;
    /**
     * Removes any "export default".
     */
    removeDefaultExport(defaultExportSymbol?: Symbol | undefined): this;
}

declare type ModuledNodeExtensionType = Node<ts.SourceFile | ts.NamespaceDeclaration> & StatementedNode;
export declare function BindingNamedNode<T extends Constructor<BindingNamedNodeExtensionType>>(Base: T): Constructor<BindingNamedNode> & T;

export interface BindingNamedNode extends BindingNamedNodeSpecific, ReferenceFindableNode, RenameableNode {
}

declare type BindingNamedNodeExtensionType = NamedNodeBaseExtensionType<ts.BindingName>;
export declare type BindingNamedNodeSpecific = NamedNodeSpecificBase<BindingName>;
export declare function NameableNode<T extends Constructor<NameableNodeExtensionType>>(Base: T): Constructor<NameableNode> & T;

export interface NameableNode extends NameableNodeSpecific, ReferenceFindableNode, RenameableNode {
}

declare type NameableNodeExtensionType = Node<ts.Node & {
        name?: ts.Identifier;
    }>;

export interface NameableNodeSpecific {
    /**
     * Gets the name node if it exists.
     */
    getNameNode(): Identifier | undefined;
    /**
     * Gets the name node if it exists, or throws.
     */
    getNameNodeOrThrow(): Identifier;
    /**
     * Gets the name if it exists.
     */
    getName(): string | undefined;
    /**
     * Gets the name if it exists, or throws.
     */
    getNameOrThrow(): string;
    /**
     * Removes the name from the node.
     */
    removeName(): this;
}

export declare function NamedNodeBase<TCompilerNode extends ts.Node, U extends Constructor<NamedNodeBaseExtensionType<TCompilerNode>>>(Base: U): Constructor<NamedNodeSpecificBase<CompilerNodeToWrappedType<TCompilerNode>>> & U;

export interface NamedNodeSpecificBase<TNode extends Node> {
    /**
     * Gets the name node.
     */
    getNameNode(): TNode;
    /**
     * Gets the name as a string.
     */
    getName(): string;
}

declare type NamedNodeBaseExtensionType<TCompilerNode extends ts.Node> = Node<ts.Node & {
        name: TCompilerNode;
    }>;
export declare function NamedNode<T extends Constructor<NamedNodeExtensionType>>(Base: T): Constructor<NamedNode> & T;

export interface NamedNode extends NamedNodeSpecific, ReferenceFindableNode, RenameableNode {
}

declare type NamedNodeExtensionType = NamedNodeBaseExtensionType<ts.Identifier>;
export declare type NamedNodeSpecific = NamedNodeSpecificBase<Identifier>;
export declare function PropertyNamedNode<T extends Constructor<PropertyNamedNodeExtensionType>>(Base: T): Constructor<PropertyNamedNode> & T;

export interface PropertyNamedNode extends PropertyNamedNodeSpecific, ReferenceFindableNode, RenameableNode {
}

declare type PropertyNamedNodeExtensionType = NamedNodeBaseExtensionType<ts.PropertyName>;
export declare type PropertyNamedNodeSpecific = NamedNodeSpecificBase<PropertyName>;
export declare function ReferenceFindableNode<T extends Constructor<ReferenceFindableNodeExtensionType>>(Base: T): Constructor<ReferenceFindableNode> & T;

export interface ReferenceFindableNode {
    /**
     * Finds the references of the definition of the node.
     */
    findReferences(): ReferencedSymbol[];
    /**
     * Finds the nodes that reference the definition of the node.
     */
    findReferencesAsNodes(): Node[];
}

declare type ReferenceFindableNodeExtensionType = Node<ts.Node & {
        name?: ts.PropertyName | ts.BindingName | ts.DeclarationName;
    }>;
export declare function RenameableNode<T extends Constructor<RenameableNodeExtensionType>>(Base: T): Constructor<RenameableNode> & T;

export interface RenameableNode {
    /**
     * Renames the name of the node.
     * @param newName - New name.
     * @param options - Options for renaming.
     */
    rename(newName: string, options?: RenameOptions): this;
}

declare type RenameableNodeExtensionType = Node<ts.Node>;
export declare function ParameteredNode<T extends Constructor<ParameteredNodeExtensionType>>(Base: T): Constructor<ParameteredNode> & T;

export interface ParameteredNode {
    /**
     * Gets a parameter or undefined if it doesn't exist.
     * @param name - Name of the parameter.
     */
    getParameter(name: string): ParameterDeclaration | undefined;
    /**
     * Gets a parameter or undefined if it doesn't exist.
     * @param findFunction - Function to use to find the parameter.
     */
    getParameter(findFunction: (declaration: ParameterDeclaration) => boolean): ParameterDeclaration | undefined;
    /**
     * Gets a parameter or throws if it doesn't exist.
     * @param name - Name of the parameter.
     */
    getParameterOrThrow(name: string): ParameterDeclaration;
    /**
     * Gets a parameter or throws if it doesn't exist.
     * @param findFunction - Function to use to find the parameter.
     */
    getParameterOrThrow(findFunction: (declaration: ParameterDeclaration) => boolean): ParameterDeclaration;
    /**
     * Gets all the parameters of the node.
     */
    getParameters(): ParameterDeclaration[];
    /**
     * Adds a parameter.
     * @param structure - Structure of the parameter.
     */
    addParameter(structure: OptionalKind<ParameterDeclarationStructure>): ParameterDeclaration;
    /**
     * Adds parameters.
     * @param structures - Structures of the parameters.
     */
    addParameters(structures: ReadonlyArray<OptionalKind<ParameterDeclarationStructure>>): ParameterDeclaration[];
    /**
     * Inserts parameters.
     * @param index - Child index to insert at.
     * @param structures - Parameters to insert.
     */
    insertParameters(index: number, structures: ReadonlyArray<OptionalKind<ParameterDeclarationStructure>>): ParameterDeclaration[];
    /**
     * Inserts a parameter.
     * @param index - Child index to insert at.
     * @param structures - Parameter to insert.
     */
    insertParameter(index: number, structure: OptionalKind<ParameterDeclarationStructure>): ParameterDeclaration;
}

declare type ParameteredNodeExtensionType = Node<ts.Node & {
        parameters: ts.NodeArray<ts.ParameterDeclaration>;
    }>;
export declare function QuestionTokenableNode<T extends Constructor<QuestionTokenableNodeExtensionType>>(Base: T): Constructor<QuestionTokenableNode> & T;

export interface QuestionTokenableNode {
    /**
     * If it has a question token.
     */
    hasQuestionToken(): boolean;
    /**
     * Gets the question token node or returns undefined if it doesn't exist.
     */
    getQuestionTokenNode(): Node<ts.QuestionToken> | undefined;
    /**
     * Gets the question token node or throws.
     */
    getQuestionTokenNodeOrThrow(): Node<ts.QuestionToken>;
    /**
     * Sets if this node has a question token.
     * @param value - If it should have a question token or not.
     */
    setHasQuestionToken(value: boolean): this;
}

declare type QuestionTokenableNodeExtensionType = Node<ts.Node & {
        questionToken?: ts.QuestionToken;
    }>;
export declare function ReadonlyableNode<T extends Constructor<ReadonlyableNodeExtensionType>>(Base: T): Constructor<ReadonlyableNode> & T;

export interface ReadonlyableNode {
    /**
     * Gets if it's readonly.
     */
    isReadonly(): boolean;
    /**
     * Gets the readonly keyword, or undefined if none exists.
     */
    getReadonlyKeyword(): Node | undefined;
    /**
     * Gets the readonly keyword, or throws if none exists.
     */
    getReadonlyKeywordOrThrow(): Node;
    /**
     * Sets if this node is readonly.
     * @param value - If readonly or not.
     */
    setIsReadonly(value: boolean): this;
}

declare type ReadonlyableNodeExtensionType = Node & ModifierableNode;
export declare function ReturnTypedNode<T extends Constructor<ReturnTypedNodeExtensionType>>(Base: T): Constructor<ReturnTypedNode> & T;

export interface ReturnTypedNode {
    /**
     * Gets the return type.
     */
    getReturnType(): Type;
    /**
     * Gets the return type node or undefined if none exists.
     */
    getReturnTypeNode(): TypeNode | undefined;
    /**
     * Gets the return type node or throws if none exists.
     */
    getReturnTypeNodeOrThrow(): TypeNode;
    /**
     * Sets the return type of the node.
     * @param textOrWriterFunction - Text or writer function to set the return type with.
     */
    setReturnType(textOrWriterFunction: string | WriterFunction): this;
    /**
     * Removes the return type.
     */
    removeReturnType(): this;
    /**
     * Gets the signature of the node from the type checker.
     */
    getSignature(): Signature;
}

declare type ReturnTypedNodeExtensionType = Node<ts.SignatureDeclaration>;
export declare function ScopeableNode<T extends Constructor<ScopeableNodeExtensionType>>(Base: T): Constructor<ScopeableNode> & T;

export interface ScopeableNode {
    /**
     * Gets the scope.
     */
    getScope(): Scope | undefined;
    /**
     * Sets the scope.
     * @param scope - Scope to set to.
     */
    setScope(scope: Scope | undefined): this;
    /**
     * Gets if the node has a scope keyword.
     */
    hasScopeKeyword(): boolean;
}

declare type ScopeableNodeExtensionType = Node & ModifierableNode;
export declare function ScopedNode<T extends Constructor<ScopedNodeExtensionType>>(Base: T): Constructor<ScopedNode> & T;

export interface ScopedNode {
    /**
     * Gets the scope.
     */
    getScope(): Scope;
    /**
     * Sets the scope.
     * @param scope - Scope to set to.
     */
    setScope(scope: Scope | undefined): this;
    /**
     * Gets if the node has a scope keyword.
     */
    hasScopeKeyword(): boolean;
}

declare type ScopedNodeExtensionType = Node & ModifierableNode;
export declare function SignaturedDeclaration<T extends Constructor<SignaturedDeclarationExtensionType>>(Base: T): Constructor<SignaturedDeclaration> & T;

export interface SignaturedDeclaration extends ParameteredNode, ReturnTypedNode {
}

declare type SignaturedDeclarationExtensionType = Node<ts.SignatureDeclaration>;
export declare function StaticableNode<T extends Constructor<StaticableNodeExtensionType>>(Base: T): Constructor<StaticableNode> & T;

export interface StaticableNode {
    /**
     * Gets if it's static.
     */
    isStatic(): boolean;
    /**
     * Gets the static keyword, or undefined if none exists.
     */
    getStaticKeyword(): Node | undefined;
    /**
     * Gets the static keyword, or throws if none exists.
     */
    getStaticKeywordOrThrow(): Node;
    /**
     * Sets if the node is static.
     * @param value - If it should be static or not.
     */
    setIsStatic(value: boolean): this;
}

declare type StaticableNodeExtensionType = Node & ModifierableNode;
export declare function TextInsertableNode<T extends Constructor<TextInsertableNodeExtensionType>>(Base: T): Constructor<TextInsertableNode> & T;

export interface TextInsertableNode {
    /**
     * Inserts text within the body of the node.
     *
     * WARNING: This will forget any previously navigated descendant nodes.
     * @param pos - Position to insert at.
     * @param textOrWriterFunction - Text to insert.
     */
    insertText(pos: number, textOrWriterFunction: string | WriterFunction): this;
    /**
     * Replaces text within the body of the node.
     *
     * WARNING: This will forget any previously navigated descendant nodes.
     * @param range - Start and end position of the text to replace.
     * @param textOrWriterFunction - Text to replace the range with.
     */
    replaceText(range: [number, number], textOrWriterFunction: string | WriterFunction): this;
    /**
     * Removes all the text within the node
     */
    removeText(): this;
    /**
     * Removes text within the body of the node.
     *
     * WARNING: This will forget any previously navigated descendant nodes.
     * @param pos - Start position to remove.
     * @param end - End position to remove.
     */
    removeText(pos: number, end: number): this;
}

declare type TextInsertableNodeExtensionType = Node;
export declare function TypeArgumentedNode<T extends Constructor<TypeArgumentedNodeExtensionType>>(Base: T): Constructor<TypeArgumentedNode> & T;

export interface TypeArgumentedNode {
    /**
     * Gets all the type arguments of the node.
     */
    getTypeArguments(): TypeNode[];
    /**
     * Adds a type argument.
     * @param argumentText - Argument text to add.
     */
    addTypeArgument(argumentText: string): TypeNode;
    /**
     * Adds type arguments.
     * @param argumentTexts - Argument texts to add.
     */
    addTypeArguments(argumentTexts: ReadonlyArray<string>): TypeNode[];
    /**
     * Inserts a type argument.
     * @param index - Child index to insert at.
     * @param argumentText - Argument text to insert.
     */
    insertTypeArgument(index: number, argumentText: string): TypeNode;
    /**
     * Inserts type arguments.
     * @param index - Child index to insert at.
     * @param argumentTexts - Argument texts to insert.
     */
    insertTypeArguments(index: number, argumentTexts: ReadonlyArray<string>): TypeNode[];
    /**
     * Removes a type argument.
     * @param typeArg - Type argument to remove.
     */
    removeTypeArgument(typeArg: Node): this;
    /**
     * Removes a type argument.
     * @param index - Index to remove.
     */
    removeTypeArgument(index: number): this;
}

declare type TypeArgumentedNodeExtensionType = Node<ts.Node & {
        typeArguments?: ts.NodeArray<ts.TypeNode>;
    }>;
export declare function TypedNode<T extends Constructor<TypedNodeExtensionType>>(Base: T): Constructor<TypedNode> & T;

export interface TypedNode {
    /**
     * Gets the type node or undefined if none exists.
     */
    getTypeNode(): TypeNode | undefined;
    /**
     * Gets the type node or throws if none exists.
     */
    getTypeNodeOrThrow(): TypeNode;
    /**
     * Sets the type.
     * @param textOrWriterFunction - Text or writer function to set the type with.
     */
    setType(textOrWriterFunction: string | WriterFunction): this;
    /**
     * Removes the type.
     */
    removeType(): this;
}

declare type TypedNodeExtensionType = Node<ts.Node & {
        type?: ts.TypeNode;
    }>;
export declare function TypeElementMemberedNode<T extends Constructor<TypeElementMemberedNodeExtensionType>>(Base: T): Constructor<TypeElementMemberedNode> & T;

export interface TypeElementMemberedNode {
    /**
     * Adds a member.
     * @param member - Member to add.
     */
    addMember(member: string | WriterFunction | TypeElementMemberStructures): TypeElementTypes | CommentTypeElement;
    /**
     * Adds members.
     * @param members - Collection of members to add.
     */
    addMembers(members: string | WriterFunction | ReadonlyArray<string | WriterFunction | TypeElementMemberStructures>): (TypeElementTypes | CommentTypeElement)[];
    /**
     * Inserts a member.
     * @param index - Child index to insert at.
     * @param member - Member to insert.
     */
    insertMember(index: number, member: string | WriterFunction | TypeElementMemberStructures): TypeElementTypes | CommentTypeElement;
    /**
     * Inserts members.
     * @param index - Child index to insert at.
     * @param members - Collection of members to insert.
     */
    insertMembers(index: number, members: string | WriterFunction | ReadonlyArray<string | WriterFunction | TypeElementMemberStructures>): (TypeElementTypes | CommentTypeElement)[];
    /**
     * Add construct signature.
     * @param structure - Structure representing the construct signature.
     */
    addConstructSignature(structure: OptionalKind<ConstructSignatureDeclarationStructure>): ConstructSignatureDeclaration;
    /**
     * Add construct signatures.
     * @param structures - Structures representing the construct signatures.
     */
    addConstructSignatures(structures: ReadonlyArray<OptionalKind<ConstructSignatureDeclarationStructure>>): ConstructSignatureDeclaration[];
    /**
     * Insert construct signature.
     * @param index - Child index to insert at.
     * @param structure - Structure representing the construct signature.
     */
    insertConstructSignature(index: number, structure: OptionalKind<ConstructSignatureDeclarationStructure>): ConstructSignatureDeclaration;
    /**
     * Insert construct signatures.
     * @param index - Child index to insert at.
     * @param structures - Structures representing the construct signatures.
     */
    insertConstructSignatures(index: number, structures: ReadonlyArray<OptionalKind<ConstructSignatureDeclarationStructure>>): ConstructSignatureDeclaration[];
    /**
     * Gets the first construct signature by a find function.
     * @param findFunction - Function to find the construct signature by.
     */
    getConstructSignature(findFunction: (member: ConstructSignatureDeclaration) => boolean): ConstructSignatureDeclaration | undefined;
    /**
     * Gets the first construct signature by a find function or throws if not found.
     * @param findFunction - Function to find the construct signature by.
     */
    getConstructSignatureOrThrow(findFunction: (member: ConstructSignatureDeclaration) => boolean): ConstructSignatureDeclaration;
    /**
     * Gets the interface construct signatures.
     */
    getConstructSignatures(): ConstructSignatureDeclaration[];
    /**
     * Add call signature.
     * @param structure - Structure representing the call signature.
     */
    addCallSignature(structure: OptionalKind<CallSignatureDeclarationStructure>): CallSignatureDeclaration;
    /**
     * Add call signatures.
     * @param structures - Structures representing the call signatures.
     */
    addCallSignatures(structures: ReadonlyArray<OptionalKind<CallSignatureDeclarationStructure>>): CallSignatureDeclaration[];
    /**
     * Insert call signature.
     * @param index - Child index to insert at.
     * @param structure - Structure representing the call signature.
     */
    insertCallSignature(index: number, structure: OptionalKind<CallSignatureDeclarationStructure>): CallSignatureDeclaration;
    /**
     * Insert call signatures.
     * @param index - Child index to insert at.
     * @param structures - Structures representing the call signatures.
     */
    insertCallSignatures(index: number, structures: ReadonlyArray<OptionalKind<CallSignatureDeclarationStructure>>): CallSignatureDeclaration[];
    /**
     * Gets the first call signature by a find function.
     * @param findFunction - Function to find the call signature by.
     */
    getCallSignature(findFunction: (member: CallSignatureDeclaration) => boolean): CallSignatureDeclaration | undefined;
    /**
     * Gets the first call signature by a find function or throws if not found.
     * @param findFunction - Function to find the call signature by.
     */
    getCallSignatureOrThrow(findFunction: (member: CallSignatureDeclaration) => boolean): CallSignatureDeclaration;
    /**
     * Gets the interface call signatures.
     */
    getCallSignatures(): CallSignatureDeclaration[];
    /**
     * Add index signature.
     * @param structure - Structure representing the index signature.
     */
    addIndexSignature(structure: OptionalKind<IndexSignatureDeclarationStructure>): IndexSignatureDeclaration;
    /**
     * Add index signatures.
     * @param structures - Structures representing the index signatures.
     */
    addIndexSignatures(structures: ReadonlyArray<OptionalKind<IndexSignatureDeclarationStructure>>): IndexSignatureDeclaration[];
    /**
     * Insert index signature.
     * @param index - Child index to insert at.
     * @param structure - Structure representing the index signature.
     */
    insertIndexSignature(index: number, structure: OptionalKind<IndexSignatureDeclarationStructure>): IndexSignatureDeclaration;
    /**
     * Insert index signatures.
     * @param index - Child index to insert at.
     * @param structures - Structures representing the index signatures.
     */
    insertIndexSignatures(index: number, structures: ReadonlyArray<OptionalKind<IndexSignatureDeclarationStructure>>): IndexSignatureDeclaration[];
    /**
     * Gets the first index signature by a find function.
     * @param findFunction - Function to find the index signature by.
     */
    getIndexSignature(findFunction: (member: IndexSignatureDeclaration) => boolean): IndexSignatureDeclaration | undefined;
    /**
     * Gets the first index signature by a find function or throws if not found.
     * @param findFunction - Function to find the index signature by.
     */
    getIndexSignatureOrThrow(findFunction: (member: IndexSignatureDeclaration) => boolean): IndexSignatureDeclaration;
    /**
     * Gets the interface index signatures.
     */
    getIndexSignatures(): IndexSignatureDeclaration[];
    /**
     * Add method.
     * @param structure - Structure representing the method.
     */
    addMethod(structure: OptionalKind<MethodSignatureStructure>): MethodSignature;
    /**
     * Add methods.
     * @param structures - Structures representing the methods.
     */
    addMethods(structures: ReadonlyArray<OptionalKind<MethodSignatureStructure>>): MethodSignature[];
    /**
     * Insert method.
     * @param index - Child index to insert at.
     * @param structure - Structure representing the method.
     */
    insertMethod(index: number, structure: OptionalKind<MethodSignatureStructure>): MethodSignature;
    /**
     * Insert methods.
     * @param index - Child index to insert at.
     * @param structures - Structures representing the methods.
     */
    insertMethods(index: number, structures: ReadonlyArray<OptionalKind<MethodSignatureStructure>>): MethodSignature[];
    /**
     * Gets the first method by name.
     * @param name - Name.
     */
    getMethod(name: string): MethodSignature | undefined;
    /**
     * Gets the first method by a find function.
     * @param findFunction - Function to find the method by.
     */
    getMethod(findFunction: (member: MethodSignature) => boolean): MethodSignature | undefined;
    /**
     * Gets the first method by name or throws if not found.
     * @param name - Name.
     */
    getMethodOrThrow(name: string): MethodSignature;
    /**
     * Gets the first method by a find function or throws if not found.
     * @param findFunction - Function to find the method by.
     */
    getMethodOrThrow(findFunction: (member: MethodSignature) => boolean): MethodSignature;
    /**
     * Gets the interface method signatures.
     */
    getMethods(): MethodSignature[];
    /**
     * Add property.
     * @param structure - Structure representing the property.
     */
    addProperty(structure: OptionalKind<PropertySignatureStructure>): PropertySignature;
    /**
     * Add properties.
     * @param structures - Structures representing the properties.
     */
    addProperties(structures: ReadonlyArray<OptionalKind<PropertySignatureStructure>>): PropertySignature[];
    /**
     * Insert property.
     * @param index - Child index to insert at.
     * @param structure - Structure representing the property.
     */
    insertProperty(index: number, structure: OptionalKind<PropertySignatureStructure>): PropertySignature;
    /**
     * Insert properties.
     * @param index - Child index to insert at.
     * @param structures - Structures representing the properties.
     */
    insertProperties(index: number, structures: ReadonlyArray<OptionalKind<PropertySignatureStructure>>): PropertySignature[];
    /**
     * Gets the first property by name.
     * @param name - Name.
     */
    getProperty(name: string): PropertySignature | undefined;
    /**
     * Gets the first property by a find function.
     * @param findFunction - Function to find the property by.
     */
    getProperty(findFunction: (member: PropertySignature) => boolean): PropertySignature | undefined;
    /**
     * Gets the first property by name or throws if not found.
     * @param name - Name.
     */
    getPropertyOrThrow(name: string): PropertySignature;
    /**
     * Gets the first property by a find function or throws if not found.
     * @param findFunction - Function to find the property by.
     */
    getPropertyOrThrow(findFunction: (member: PropertySignature) => boolean): PropertySignature;
    /**
     * Gets the interface property signatures.
     */
    getProperties(): PropertySignature[];
    /**
     * Gets all the members.
     */
    getMembers(): TypeElementTypes[];
    /**
     * Gets all the members with comment type elements.
     */
    getMembersWithComments(): (TypeElementTypes | CommentTypeElement)[];
}

declare type TypeElementMemberedNodeExtensionType = Node<ts.Node & {
        members: ts.NodeArray<ts.TypeElement>;
    }>;
export declare function TypeParameteredNode<T extends Constructor<TypeParameteredNodeExtensionType>>(Base: T): Constructor<TypeParameteredNode> & T;

export interface TypeParameteredNode {
    /**
     * Gets a type parameter or undefined if it doesn't exist.
     * @param name - Name of the parameter.
     */
    getTypeParameter(name: string): TypeParameterDeclaration | undefined;
    /**
     * Gets a type parameter or undefined if it doesn't exist.
     * @param findFunction - Function to use to find the type parameter.
     */
    getTypeParameter(findFunction: (declaration: TypeParameterDeclaration) => boolean): TypeParameterDeclaration | undefined;
    /**
     * Gets a type parameter or throws if it doesn't exist.
     * @param name - Name of the parameter.
     */
    getTypeParameterOrThrow(name: string): TypeParameterDeclaration;
    /**
     * Gets a type parameter or throws if it doesn't exist.
     * @param findFunction - Function to use to find the type parameter.
     */
    getTypeParameterOrThrow(findFunction: (declaration: TypeParameterDeclaration) => boolean): TypeParameterDeclaration;
    /**
     * Gets the type parameters.
     */
    getTypeParameters(): TypeParameterDeclaration[];
    /**
     * Adds a type parameter.
     * @param structure - Structure of the type parameter.
     */
    addTypeParameter(structure: OptionalKind<TypeParameterDeclarationStructure> | string): TypeParameterDeclaration;
    /**
     * Adds type parameters.
     * @param structures - Structures of the type parameters.
     */
    addTypeParameters(structures: ReadonlyArray<OptionalKind<TypeParameterDeclarationStructure> | string>): TypeParameterDeclaration[];
    /**
     * Inserts a type parameter.
     * @param index - Child index to insert at. Specify a negative index to insert from the reverse.
     * @param structure - Structure of the type parameter.
     */
    insertTypeParameter(index: number, structure: OptionalKind<TypeParameterDeclarationStructure> | string): TypeParameterDeclaration;
    /**
     * Inserts type parameters.
     * @param index - Child index to insert at. Specify a negative index to insert from the reverse.
     * @param structures - Structures of the type parameters.
     */
    insertTypeParameters(index: number, structures: ReadonlyArray<OptionalKind<TypeParameterDeclarationStructure> | string>): TypeParameterDeclaration[];
}

declare type TypeParameteredNodeExtensionType = Node<ts.Node & {
        typeParameters?: ts.NodeArray<ts.TypeParameterDeclaration>;
    }>;
export declare function UnwrappableNode<T extends Constructor<UnwrappableNodeExtensionType>>(Base: T): Constructor<UnwrappableNode> & T;

export interface UnwrappableNode {
    /**
     * Replaces the node's text with its body's statements.
     */
    unwrap(): void;
}

declare type UnwrappableNodeExtensionType = Node;

export declare class ArrayBindingPattern extends Node<ts.ArrayBindingPattern> {
    /**
     * Gets the array binding pattern's elements.
     */
    getElements(): (BindingElement | OmittedExpression)[];
}

declare const BindingElementBase: Constructor<InitializerExpressionableNode> & Constructor<BindingNamedNode> & typeof Node;

export declare class BindingElement extends BindingElementBase<ts.BindingElement> {
    /**
     * Gets the binding element's dot dot dot token (...) if it exists or throws if not.
     */
    getDotDotDotTokenOrThrow(): Node<ts.Token<SyntaxKind.DotDotDotToken>>;
    /**
     * Gets the binding element's dot dot dot token (...) if it exists or returns undefined.
     */
    getDotDotDotToken(): Node<ts.Token<SyntaxKind.DotDotDotToken>> | undefined;
    /**
     * Gets binding element's property name node or throws if not found.
     *
     * For example in `const { a: b } = { a: 5 }`, `a` would be the property name.
     */
    getPropertyNameNodeOrThrow(): PropertyName;
    /**
     * Gets binding element's property name node or returns undefined if not found.
     *
     * For example in `const { a: b } = { a: 5 }`, `a` would be the property name.
     */
    getPropertyNameNode(): Identifier | NumericLiteral | StringLiteral | ComputedPropertyName | undefined;
}

export declare class ObjectBindingPattern extends Node<ts.ObjectBindingPattern> {
    /**
     * Gets the object binding pattern's elements.
     */
    getElements(): BindingElement[];
}

export declare function AbstractableNode<T extends Constructor<AbstractableNodeExtensionType>>(Base: T): Constructor<AbstractableNode> & T;

export interface AbstractableNode {
    /**
     * Gets if the node is abstract.
     */
    isAbstract(): boolean;
    /**
     * Gets the abstract keyword or undefined if it doesn't exist.
     */
    getAbstractKeyword(): Node | undefined;
    /**
     * Gets the abstract keyword or throws if it doesn't exist.
     */
    getAbstractKeywordOrThrow(): Node;
    /**
     * Sets if the node is abstract.
     * @param isAbstract - If it should be abstract or not.
     */
    setIsAbstract(isAbstract: boolean): this;
}

declare type AbstractableNodeExtensionType = Node & ModifierableNode;
export declare function ClassLikeDeclarationBase<T extends Constructor<ClassLikeDeclarationBaseExtensionType>>(Base: T): Constructor<ClassLikeDeclarationBase> & T;

export interface ClassLikeDeclarationBase extends NameableNode, TextInsertableNode, ImplementsClauseableNode, HeritageClauseableNode, AbstractableNode, JSDocableNode, TypeParameteredNode, DecoratableNode, ModifierableNode, ClassLikeDeclarationBaseSpecific {
}

declare function ClassLikeDeclarationBaseSpecific<T extends Constructor<ClassLikeDeclarationBaseSpecificExtensionType>>(Base: T): Constructor<ClassLikeDeclarationBaseSpecific> & T;

interface ClassLikeDeclarationBaseSpecific {
    /**
     * Sets the extends expression.
     * @param text - Text to set as the extends expression.
     */
    setExtends(text: string | WriterFunction): this;
    /**
     * Removes the extends expression, if it exists.
     */
    removeExtends(): this;
    /**
     * Gets the extends expression or throws if it doesn't exist.
     */
    getExtendsOrThrow(): ExpressionWithTypeArguments;
    /**
     * Gets the extends expression or returns undefined if it doesn't exist.
     */
    getExtends(): ExpressionWithTypeArguments | undefined;
    /**
     * Inserts a class member.
     * @param member - Class member to insert.
     */
    addMember(member: string | WriterFunction | ClassMemberStructures): ClassMemberTypes | CommentClassElement;
    /**
     * Inserts class members.
     * @param members - Collection of class members to insert.
     */
    addMembers(members: string | WriterFunction | ReadonlyArray<string | WriterFunction | ClassMemberStructures>): (ClassMemberTypes | CommentClassElement)[];
    /**
     * Inserts a class member.
     * @param index - Child index to insert at.
     * @param member - Class member to insert.
     */
    insertMember(index: number, member: string | WriterFunction | ClassMemberStructures): ClassMemberTypes | CommentClassElement;
    /**
     * Inserts class members.
     * @param index - Child index to insert at.
     * @param members - Collection of class members to insert.
     */
    insertMembers(index: number, members: string | WriterFunction | ReadonlyArray<string | WriterFunction | ClassMemberStructures>): (ClassMemberTypes | CommentClassElement)[];
    /**
     * Adds a constructor.
     * @param structure - Structure of the constructor.
     */
    addConstructor(structure?: OptionalKind<ConstructorDeclarationStructure>): ConstructorDeclaration;
    /**
     * Adds constructors.
     * @param structures - Structures of the constructor.
     */
    addConstructors(structures: ReadonlyArray<OptionalKind<ConstructorDeclarationStructure>>): ConstructorDeclaration[];
    /**
     * Inserts a constructor.
     * @param index - Child index to insert at.
     * @param structure - Structure of the constructor.
     */
    insertConstructor(index: number, structure?: OptionalKind<ConstructorDeclarationStructure>): ConstructorDeclaration;
    /**
     * Inserts constructors.
     * @param index - Child index to insert at.
     * @param structures - Structures of the constructor.
     */
    insertConstructors(index: number, structures: ReadonlyArray<OptionalKind<ConstructorDeclarationStructure>>): ConstructorDeclaration[];
    /**
     * Gets the constructor declarations.
     */
    getConstructors(): ConstructorDeclaration[];
    /**
     * Add get accessor.
     * @param structure - Structure representing the get accessor.
     */
    addGetAccessor(structure: OptionalKind<GetAccessorDeclarationStructure>): GetAccessorDeclaration;
    /**
     * Add properties.
     * @param structures - Structures representing the properties.
     */
    addGetAccessors(structures: ReadonlyArray<OptionalKind<GetAccessorDeclarationStructure>>): GetAccessorDeclaration[];
    /**
     * Insert get accessor.
     * @param index - Child index to insert at.
     * @param structure - Structure representing the get accessor.
     */
    insertGetAccessor(index: number, structure: OptionalKind<GetAccessorDeclarationStructure>): GetAccessorDeclaration;
    /**
     * Insert properties.
     * @param index - Child index to insert at.
     * @param structures - Structures representing the properties.
     */
    insertGetAccessors(index: number, structures: ReadonlyArray<OptionalKind<GetAccessorDeclarationStructure>>): GetAccessorDeclaration[];
    /**
     * Add set accessor.
     * @param structure - Structure representing the set accessor.
     */
    addSetAccessor(structure: OptionalKind<SetAccessorDeclarationStructure>): SetAccessorDeclaration;
    /**
     * Add properties.
     * @param structures - Structures representing the properties.
     */
    addSetAccessors(structures: ReadonlyArray<OptionalKind<SetAccessorDeclarationStructure>>): SetAccessorDeclaration[];
    /**
     * Insert set accessor.
     * @param index - Child index to insert at.
     * @param structure - Structure representing the set accessor.
     */
    insertSetAccessor(index: number, structure: OptionalKind<SetAccessorDeclarationStructure>): SetAccessorDeclaration;
    /**
     * Insert properties.
     * @param index - Child index to insert at.
     * @param structures - Structures representing the properties.
     */
    insertSetAccessors(index: number, structures: ReadonlyArray<OptionalKind<SetAccessorDeclarationStructure>>): SetAccessorDeclaration[];
    /**
     * Add property.
     * @param structure - Structure representing the property.
     */
    addProperty(structure: OptionalKind<PropertyDeclarationStructure>): PropertyDeclaration;
    /**
     * Add properties.
     * @param structures - Structures representing the properties.
     */
    addProperties(structures: ReadonlyArray<OptionalKind<PropertyDeclarationStructure>>): PropertyDeclaration[];
    /**
     * Insert property.
     * @param index - Child index to insert at.
     * @param structure - Structure representing the property.
     */
    insertProperty(index: number, structure: OptionalKind<PropertyDeclarationStructure>): PropertyDeclaration;
    /**
     * Insert properties.
     * @param index - Child index to insert at.
     * @param structures - Structures representing the properties.
     */
    insertProperties(index: number, structures: ReadonlyArray<OptionalKind<PropertyDeclarationStructure>>): PropertyDeclaration[];
    /**
     * Add method.
     * @param structure - Structure representing the method.
     */
    addMethod(structure: OptionalKind<MethodDeclarationStructure>): MethodDeclaration;
    /**
     * Add methods.
     * @param structures - Structures representing the methods.
     */
    addMethods(structures: ReadonlyArray<OptionalKind<MethodDeclarationStructure>>): MethodDeclaration[];
    /**
     * Insert method.
     * @param index - Child index to insert at.
     * @param structure - Structure representing the method.
     */
    insertMethod(index: number, structure: OptionalKind<MethodDeclarationStructure>): MethodDeclaration;
    /**
     * Insert methods.
     * @param index - Child index to insert at.
     * @param structures - Structures representing the methods.
     */
    insertMethods(index: number, structures: ReadonlyArray<OptionalKind<MethodDeclarationStructure>>): MethodDeclaration[];
    /**
     * Gets the first instance property by name.
     * @param name - Name.
     */
    getInstanceProperty(name: string): ClassInstancePropertyTypes | undefined;
    /**
     * Gets the first instance property by a find function.
     * @param findFunction - Function to find an instance property by.
     */
    getInstanceProperty(findFunction: (prop: ClassInstancePropertyTypes) => boolean): ClassInstancePropertyTypes | undefined;
    /**
     * Gets the first instance property by name or throws if not found.
     * @param name - Name.
     */
    getInstancePropertyOrThrow(name: string): ClassInstancePropertyTypes;
    /**
     * Gets the first instance property by a find function or throws if not found.
     * @param findFunction - Function to find an instance property by.
     */
    getInstancePropertyOrThrow(findFunction: (prop: ClassInstancePropertyTypes) => boolean): ClassInstancePropertyTypes;
    /**
     * Gets the class instance property declarations.
     */
    getInstanceProperties(): ClassInstancePropertyTypes[];
    /**
     * Gets the first static property by name.
     * @param name - Name.
     */
    getStaticProperty(name: string): ClassStaticPropertyTypes | undefined;
    /**
     * Gets the first static property by a find function.
     * @param findFunction - Function to find a static property by.
     */
    getStaticProperty(findFunction: (prop: ClassStaticPropertyTypes) => boolean): ClassStaticPropertyTypes | undefined;
    /**
     * Gets the first static property by name or throws if not found.
     * @param name - Name.
     */
    getStaticPropertyOrThrow(name: string): ClassStaticPropertyTypes;
    /**
     * Gets the first static property by a find function. or throws if not found.
     * @param findFunction - Function to find a static property by.
     */
    getStaticPropertyOrThrow(findFunction: (prop: ClassStaticPropertyTypes) => boolean): ClassStaticPropertyTypes;
    /**
     * Gets the class instance property declarations.
     */
    getStaticProperties(): ClassStaticPropertyTypes[];
    /**
     * Gets the first property declaration by name.
     * @param name - Name.
     */
    getProperty(name: string): PropertyDeclaration | undefined;
    /**
     * Gets the first property declaration by a find function.
     * @param findFunction - Function to find a property declaration by.
     */
    getProperty(findFunction: (property: PropertyDeclaration) => boolean): PropertyDeclaration | undefined;
    /**
     * Gets the first property declaration by name or throws if it doesn't exist.
     * @param name - Name.
     */
    getPropertyOrThrow(name: string): PropertyDeclaration;
    /**
     * Gets the first property declaration by a find function or throws if it doesn't exist.
     * @param findFunction - Function to find a property declaration by.
     */
    getPropertyOrThrow(findFunction: (property: PropertyDeclaration) => boolean): PropertyDeclaration;
    /**
     * Gets the class property declarations regardless of whether it's an instance of static property.
     */
    getProperties(): PropertyDeclaration[];
    /**
     * Gets the first get accessor declaration by name.
     * @param name - Name.
     */
    getGetAccessor(name: string): GetAccessorDeclaration | undefined;
    /**
     * Gets the first get accessor declaration by a find function.
     * @param findFunction - Function to find a get accessor declaration by.
     */
    getGetAccessor(findFunction: (getAccessor: GetAccessorDeclaration) => boolean): GetAccessorDeclaration | undefined;
    /**
     * Gets the first get accessor declaration by name or throws if it doesn't exist.
     * @param name - Name.
     */
    getGetAccessorOrThrow(name: string): GetAccessorDeclaration;
    /**
     * Gets the first get accessor declaration by a find function or throws if it doesn't exist.
     * @param findFunction - Function to find a get accessor declaration by.
     */
    getGetAccessorOrThrow(findFunction: (getAccessor: GetAccessorDeclaration) => boolean): GetAccessorDeclaration;
    /**
     * Gets the class get accessor declarations regardless of whether it's an instance of static getAccessor.
     */
    getGetAccessors(): GetAccessorDeclaration[];
    /**
     * Sets the first set accessor declaration by name.
     * @param name - Name.
     */
    getSetAccessor(name: string): SetAccessorDeclaration | undefined;
    /**
     * Sets the first set accessor declaration by a find function.
     * @param findFunction - Function to find a set accessor declaration by.
     */
    getSetAccessor(findFunction: (setAccessor: SetAccessorDeclaration) => boolean): SetAccessorDeclaration | undefined;
    /**
     * Sets the first set accessor declaration by name or throws if it doesn't exist.
     * @param name - Name.
     */
    getSetAccessorOrThrow(name: string): SetAccessorDeclaration;
    /**
     * Sets the first set accessor declaration by a find function or throws if it doesn't exist.
     * @param findFunction - Function to find a set accessor declaration by.
     */
    getSetAccessorOrThrow(findFunction: (setAccessor: SetAccessorDeclaration) => boolean): SetAccessorDeclaration;
    /**
     * Sets the class set accessor declarations regardless of whether it's an instance of static setAccessor.
     */
    getSetAccessors(): SetAccessorDeclaration[];
    /**
     * Gets the first method declaration by name.
     * @param name - Name.
     */
    getMethod(name: string): MethodDeclaration | undefined;
    /**
     * Gets the first method declaration by a find function.
     * @param findFunction - Function to find a method declaration by.
     */
    getMethod(findFunction: (method: MethodDeclaration) => boolean): MethodDeclaration | undefined;
    /**
     * Gets the first method declaration by name or throws if it doesn't exist.
     * @param name - Name.
     */
    getMethodOrThrow(name: string): MethodDeclaration;
    /**
     * Gets the first method declaration by a find function or throws if it doesn't exist.
     * @param findFunction - Function to find a method declaration by.
     */
    getMethodOrThrow(findFunction: (method: MethodDeclaration) => boolean): MethodDeclaration;
    /**
     * Gets the class method declarations regardless of whether it's an instance of static method.
     */
    getMethods(): MethodDeclaration[];
    /**
     * Gets the first instance method by name.
     * @param name - Name.
     */
    getInstanceMethod(name: string): MethodDeclaration | undefined;
    /**
     * Gets the first instance method by a find function.
     * @param findFunction - Function to find an instance method by.
     */
    getInstanceMethod(findFunction: (method: MethodDeclaration) => boolean): MethodDeclaration | undefined;
    /**
     * Gets the first instance method by name or throws if not found.
     * @param name - Name.
     */
    getInstanceMethodOrThrow(name: string): MethodDeclaration;
    /**
     * Gets the first instance method by a find function. or throws if not found.
     * @param findFunction - Function to find an instance method by.
     */
    getInstanceMethodOrThrow(findFunction: (method: MethodDeclaration) => boolean): MethodDeclaration;
    /**
     * Gets the class instance method declarations.
     */
    getInstanceMethods(): MethodDeclaration[];
    /**
     * Gets the first static method by name.
     * @param name - Name.
     */
    getStaticMethod(name: string): MethodDeclaration | undefined;
    /**
     * Gets the first static method by a find function.
     * @param findFunction - Function to find a static method by.
     */
    getStaticMethod(findFunction: (method: MethodDeclaration) => boolean): MethodDeclaration | undefined;
    /**
     * Gets the first static method by name or throws if not found.
     * @param name - Name.
     */
    getStaticMethodOrThrow(name: string): MethodDeclaration;
    /**
     * Gets the first static method by a find function. or throws if not found.
     * @param findFunction - Function to find a static method by.
     */
    getStaticMethodOrThrow(findFunction: (method: MethodDeclaration) => boolean): MethodDeclaration;
    /**
     * Gets the class instance method declarations.
     */
    getStaticMethods(): MethodDeclaration[];
    /**
     * Gets the first instance member by name.
     * @param name - Name.
     */
    getInstanceMember(name: string): ClassInstanceMemberTypes | undefined;
    /**
     * Gets the first instance member by a find function.
     * @param findFunction - Function to find the instance member by.
     */
    getInstanceMember(findFunction: (member: ClassInstanceMemberTypes) => boolean): ClassInstanceMemberTypes | undefined;
    /**
     * Gets the first instance member by name or throws if not found.
     * @param name - Name.
     */
    getInstanceMemberOrThrow(name: string): ClassInstanceMemberTypes;
    /**
     * Gets the first instance member by a find function. or throws if not found.
     * @param findFunction - Function to find the instance member by.
     */
    getInstanceMemberOrThrow(findFunction: (member: ClassInstanceMemberTypes) => boolean): ClassInstanceMemberTypes;
    /**
     * Gets the instance members.
     */
    getInstanceMembers(): ClassInstanceMemberTypes[];
    /**
     * Gets the first static member by name.
     * @param name - Name.
     */
    getStaticMember(name: string): ClassStaticMemberTypes | undefined;
    /**
     * Gets the first static member by a find function.
     * @param findFunction - Function to find an static method by.
     */
    getStaticMember(findFunction: (member: ClassStaticMemberTypes) => boolean): ClassStaticMemberTypes | undefined;
    /**
     * Gets the first static member by name or throws if not found.
     * @param name - Name.
     */
    getStaticMemberOrThrow(name: string): ClassStaticMemberTypes;
    /**
     * Gets the first static member by a find function. or throws if not found.
     * @param findFunction - Function to find an static method by.
     */
    getStaticMemberOrThrow(findFunction: (member: ClassStaticMemberTypes) => boolean): ClassStaticMemberTypes;
    /**
     * Gets the static members.
     */
    getStaticMembers(): ClassStaticMemberTypes[];
    /**
     * Gets the class' members regardless of whether it's an instance of static member.
     */
    getMembers(): ClassMemberTypes[];
    /**
     * Gets the class' members with comment class elements.
     */
    getMembersWithComments(): (ClassMemberTypes | CommentClassElement)[];
    /**
     * Gets the first member by name.
     * @param name - Name.
     */
    getMember(name: string): ClassMemberTypes | undefined;
    /**
     * Gets the first member by a find function.
     * @param findFunction - Function to find an method by.
     */
    getMember(findFunction: (member: ClassMemberTypes) => boolean): ClassMemberTypes | undefined;
    /**
     * Gets the first member by name or throws if not found.
     * @param name - Name.
     */
    getMemberOrThrow(name: string): ClassMemberTypes;
    /**
     * Gets the first member by a find function. or throws if not found.
     * @param findFunction - Function to find an method by.
     */
    getMemberOrThrow(findFunction: (member: ClassMemberTypes) => boolean): ClassMemberTypes;
    /**
     * Gets the base types.
     *
     * This is useful to use if the base could possibly be a mixin.
     */
    getBaseTypes(): Type[];
    /**
     * Gets the base class or throws.
     *
     * Note: Use getBaseTypes if you need to get the mixins.
     */
    getBaseClassOrThrow(): ClassDeclaration;
    /**
     * Gets the base class.
     *
     * Note: Use getBaseTypes if you need to get the mixins.
     */
    getBaseClass(): ClassDeclaration | undefined;
    /**
     * Gets all the derived classes.
     */
    getDerivedClasses(): ClassDeclaration[];
}

export declare type ClassPropertyTypes = PropertyDeclaration | GetAccessorDeclaration | SetAccessorDeclaration;
export declare type ClassInstancePropertyTypes = ClassPropertyTypes | ParameterDeclaration;
export declare type ClassInstanceMemberTypes = MethodDeclaration | ClassInstancePropertyTypes;
export declare type ClassStaticPropertyTypes = PropertyDeclaration | GetAccessorDeclaration | SetAccessorDeclaration;
export declare type ClassStaticMemberTypes = MethodDeclaration | ClassStaticPropertyTypes;
export declare type ClassMemberTypes = MethodDeclaration | PropertyDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration;
declare type ClassLikeDeclarationBaseExtensionType = Node<ts.ClassLikeDeclarationBase>;
declare type ClassLikeDeclarationBaseSpecificExtensionType = Node<ts.ClassLikeDeclarationBase> & HeritageClauseableNode & ModifierableNode & NameableNode;

export declare class CommentClassElement extends ClassElement<CompilerCommentClassElement> {
}

declare const ClassDeclarationBase: Constructor<NamespaceChildableNode> & Constructor<AmbientableNode> & Constructor<ExportableNode> & Constructor<ClassLikeDeclarationBase> & typeof Statement;

export declare class ClassDeclaration extends ClassDeclarationBase<ts.ClassDeclaration> {
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<ClassDeclarationStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): ClassDeclarationStructure;
    /**
     * Extracts an interface declaration structure from the class.
     * @param name - Name of the interface. Falls back to the same name as the class and then the filepath's base name.
     */
    extractInterface(name?: string): InterfaceDeclarationStructure;
    /**
     * Extracts an interface declaration structure from the static part of the class.
     * @param name - Name of the interface.
     */
    extractStaticInterface(name: string): InterfaceDeclarationStructure;
}

export declare class ClassElement<T extends ts.ClassElement = ts.ClassElement> extends Node<T> {
    /**
     * Removes the class member.
     */
    remove(): void;
}

declare const ClassExpressionBase: Constructor<ClassLikeDeclarationBase> & typeof PrimaryExpression;

export declare class ClassExpression extends ClassExpressionBase<ts.ClassExpression> {
}

declare const ConstructorDeclarationBase: Constructor<ChildOrderableNode> & Constructor<TextInsertableNode> & Constructor<OverloadableNode> & Constructor<ScopedNode> & Constructor<FunctionLikeDeclaration> & Constructor<BodyableNode> & typeof ClassElement;
declare const ConstructorDeclarationOverloadBase: Constructor<TypeParameteredNode> & Constructor<JSDocableNode> & Constructor<ChildOrderableNode> & Constructor<TextInsertableNode> & Constructor<ScopedNode> & Constructor<ModifierableNode> & Constructor<SignaturedDeclaration> & typeof ClassElement;

export declare class ConstructorDeclaration extends ConstructorDeclarationBase<ts.ConstructorDeclaration> {
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<ConstructorDeclarationStructure>): this;
    /**
     * Add a constructor overload.
     * @param structure - Structure to add.
     */
    addOverload(structure: OptionalKind<ConstructorDeclarationOverloadStructure>): ConstructorDeclaration;
    /**
     * Add constructor overloads.
     * @param structures - Structures to add.
     */
    addOverloads(structures: ReadonlyArray<OptionalKind<ConstructorDeclarationOverloadStructure>>): ConstructorDeclaration[];
    /**
     * Inserts a constructor overload.
     * @param index - Child index to insert at.
     * @param structure - Structures to insert.
     */
    insertOverload(index: number, structure: OptionalKind<ConstructorDeclarationOverloadStructure>): ConstructorDeclaration;
    /**
     * Inserts constructor overloads.
     * @param index - Child index to insert at.
     * @param structures - Structures to insert.
     */
    insertOverloads(index: number, structures: ReadonlyArray<OptionalKind<ConstructorDeclarationOverloadStructure>>): ConstructorDeclaration[];
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): ConstructorDeclarationStructure | ConstructorDeclarationOverloadStructure;
}

declare const GetAccessorDeclarationBase: Constructor<ChildOrderableNode> & Constructor<TextInsertableNode> & Constructor<DecoratableNode> & Constructor<AbstractableNode> & Constructor<ScopedNode> & Constructor<StaticableNode> & Constructor<FunctionLikeDeclaration> & Constructor<BodyableNode> & Constructor<PropertyNamedNode> & typeof ClassElement;

export declare class GetAccessorDeclaration extends GetAccessorDeclarationBase<ts.GetAccessorDeclaration> {
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<GetAccessorDeclarationStructure>): this;
    /**
     * Gets the corresponding set accessor if one exists.
     */
    getSetAccessor(): SetAccessorDeclaration | undefined;
    /**
     * Gets the corresponding set accessor or throws if not exists.
     */
    getSetAccessorOrThrow(): SetAccessorDeclaration;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): GetAccessorDeclarationStructure;
}

declare const MethodDeclarationBase: Constructor<ChildOrderableNode> & Constructor<TextInsertableNode> & Constructor<OverloadableNode> & Constructor<BodyableNode> & Constructor<DecoratableNode> & Constructor<AbstractableNode> & Constructor<ScopedNode> & Constructor<QuestionTokenableNode> & Constructor<StaticableNode> & Constructor<AsyncableNode> & Constructor<GeneratorableNode> & Constructor<FunctionLikeDeclaration> & Constructor<PropertyNamedNode> & typeof ClassElement;
declare const MethodDeclarationOverloadBase: Constructor<JSDocableNode> & Constructor<ChildOrderableNode> & Constructor<TextInsertableNode> & Constructor<ScopedNode> & Constructor<TypeParameteredNode> & Constructor<AbstractableNode> & Constructor<QuestionTokenableNode> & Constructor<StaticableNode> & Constructor<AsyncableNode> & Constructor<ModifierableNode> & Constructor<GeneratorableNode> & Constructor<SignaturedDeclaration> & typeof ClassElement;

export declare class MethodDeclaration extends MethodDeclarationBase<ts.MethodDeclaration> {
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<MethodDeclarationStructure>): this;
    /**
     * Add a method overload.
     * @param structure - Structure to add.
     */
    addOverload(structure: OptionalKind<MethodDeclarationOverloadStructure>): MethodDeclaration;
    /**
     * Add method overloads.
     * @param structures - Structures to add.
     */
    addOverloads(structures: ReadonlyArray<OptionalKind<MethodDeclarationOverloadStructure>>): MethodDeclaration[];
    /**
     * Inserts a method overload.
     * @param index - Child index to insert at.
     * @param structure - Structures to insert.
     */
    insertOverload(index: number, structure: OptionalKind<MethodDeclarationOverloadStructure>): MethodDeclaration;
    /**
     * Inserts method overloads.
     * @param index - Child index to insert at.
     * @param structures - Structures to insert.
     */
    insertOverloads(index: number, structures: ReadonlyArray<OptionalKind<MethodDeclarationOverloadStructure>>): MethodDeclaration[];
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): MethodDeclarationStructure | MethodDeclarationOverloadStructure;
}

declare const PropertyDeclarationBase: Constructor<ChildOrderableNode> & Constructor<DecoratableNode> & Constructor<AbstractableNode> & Constructor<ScopedNode> & Constructor<StaticableNode> & Constructor<JSDocableNode> & Constructor<ReadonlyableNode> & Constructor<ExclamationTokenableNode> & Constructor<QuestionTokenableNode> & Constructor<InitializerExpressionableNode> & Constructor<TypedNode> & Constructor<PropertyNamedNode> & Constructor<ModifierableNode> & typeof ClassElement;

export declare class PropertyDeclaration extends PropertyDeclarationBase<ts.PropertyDeclaration> {
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<PropertyDeclarationStructure>): this;
    /**
     * Removes the property.
     */
    remove(): void;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): PropertyDeclarationStructure;
}

declare const SetAccessorDeclarationBase: Constructor<ChildOrderableNode> & Constructor<TextInsertableNode> & Constructor<DecoratableNode> & Constructor<AbstractableNode> & Constructor<ScopedNode> & Constructor<StaticableNode> & Constructor<FunctionLikeDeclaration> & Constructor<BodyableNode> & Constructor<PropertyNamedNode> & typeof ClassElement;

export declare class SetAccessorDeclaration extends SetAccessorDeclarationBase<ts.SetAccessorDeclaration> {
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<SetAccessorDeclarationStructure>): this;
    /**
     * Gets the corresponding get accessor if one exists.
     */
    getGetAccessor(): GetAccessorDeclaration | undefined;
    /**
     * Gets the corresponding get accessor or throws if not exists.
     */
    getGetAccessorOrThrow(): GetAccessorDeclaration;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): SetAccessorDeclarationStructure;
}

export declare class CommentRange extends TextRange<ts.CommentRange> {
    private constructor();
    /**
     * Gets the comment syntax kind.
     */
    getKind(): ts.CommentKind;
}

export declare abstract class CompilerExtendedComment implements ts.Node {
    private _fullStart;
    private _start;
    private _sourceFile;
    pos: number;
    end: number;
    kind: SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia;
    flags: ts.NodeFlags;
    decorators?: ts.NodeArray<ts.Decorator> | undefined;
    modifiers?: ts.NodeArray<ts.Modifier> | undefined;
    parent: ts.Node;
    protected constructor();
    getSourceFile(): ts.SourceFile;
    getChildCount(sourceFile?: ts.SourceFile | undefined): number;
    getChildAt(index: number, sourceFile?: ts.SourceFile | undefined): ts.Node;
    getChildren(sourceFile?: ts.SourceFile | undefined): ts.Node[];
    getStart(sourceFile?: ts.SourceFile | undefined, includeJsDocComment?: boolean | undefined): number;
    getFullStart(): number;
    getEnd(): number;
    getWidth(sourceFile?: ts.SourceFileLike | undefined): number;
    getFullWidth(): number;
    getLeadingTriviaWidth(sourceFile?: ts.SourceFile | undefined): number;
    getFullText(sourceFile?: ts.SourceFile | undefined): string;
    getText(sourceFile?: ts.SourceFile | undefined): string;
    getFirstToken(sourceFile?: ts.SourceFile | undefined): ts.Node | undefined;
    getLastToken(sourceFile?: ts.SourceFile | undefined): ts.Node | undefined;
    forEachChild<T>(cbNode: (node: ts.Node) => T | undefined, cbNodeArray?: ((nodes: ts.NodeArray<ts.Node>) => T | undefined) | undefined): T | undefined;
}

export declare class CompilerCommentStatement extends CompilerExtendedComment implements ts.Statement {
    _statementBrand: any;
}

export declare class CompilerCommentClassElement extends CompilerExtendedComment implements ts.ClassElement {
    _classElementBrand: any;
    _declarationBrand: any;
}

export declare class CompilerCommentTypeElement extends CompilerExtendedComment implements ts.TypeElement {
    _typeElementBrand: any;
    _declarationBrand: any;
}

export declare class CompilerCommentObjectLiteralElement extends CompilerExtendedComment implements ts.ObjectLiteralElement {
    _declarationBrand: any;
    _objectLiteralBrandBrand: any;
    _objectLiteralBrand: any;
    declarationBrand: any;
}

export declare class CompilerCommentEnumMember extends CompilerExtendedComment implements ts.Node {
}

export declare class ComputedPropertyName extends Node<ts.ComputedPropertyName> {
    /**
     * Gets the expression.
     */
    getExpression(): Expression;
}

declare const IdentifierBase: Constructor<ReferenceFindableNode> & Constructor<RenameableNode> & typeof PrimaryExpression;

export declare class Identifier extends IdentifierBase<ts.Identifier> {
    /**
     * Gets the text for the identifier.
     */
    getText(): string;
    /**
     * Gets the definition nodes of the identifier.
     * @remarks This is similar to "go to definition" and `.getDefinitions()`, but only returns the nodes.
     */
    getDefinitionNodes(): Node[];
    /**
     * Gets the definitions of the identifier.
     * @remarks This is similar to "go to definition." Use `.getDefinitionNodes()` if you only care about the nodes.
     */
    getDefinitions(): DefinitionInfo[];
    /**
     * Gets the implementations of the identifier.
     *
     * This is similar to "go to implementation."
     */
    getImplementations(): ImplementationLocation[];
}

export declare type NodePropertyToWrappedType<NodeType extends ts.Node, KeyName extends keyof NodeType, NonNullableNodeType = NonNullable<NodeType[KeyName]>> = NodeType[KeyName] extends ts.NodeArray<infer ArrayNodeTypeForNullable> | undefined ? CompilerNodeToWrappedType<ArrayNodeTypeForNullable>[] | undefined : NodeType[KeyName] extends ts.NodeArray<infer ArrayNodeType> ? CompilerNodeToWrappedType<ArrayNodeType>[] : NodeType[KeyName] extends ts.Node ? CompilerNodeToWrappedType<NodeType[KeyName]> : NonNullableNodeType extends ts.Node ? CompilerNodeToWrappedType<NonNullableNodeType> | undefined : NodeType[KeyName];
export declare type NodeParentType<NodeType extends ts.Node> = NodeType extends ts.SourceFile ? CompilerNodeToWrappedType<NodeType["parent"]> | undefined : ts.Node extends NodeType ? CompilerNodeToWrappedType<NodeType["parent"]> | undefined : CompilerNodeToWrappedType<NodeType["parent"]>;

export declare class Node<NodeType extends ts.Node = ts.Node> {
    /**
     * Gets the underlying compiler node.
     */
    readonly compilerNode: NodeType;
    protected constructor();
    /**
     * Releases the node and all its descendants from the underlying node cache and ast.
     *
     * This is useful if you want to improve the performance of manipulation by not tracking this node anymore.
     */
    forget(): void;
    /**
     * Forgets the descendants of this node.
     */
    forgetDescendants(): this;
    /**
     * Gets if the compiler node was forgotten.
     *
     * This will be true when the compiler node was forgotten or removed.
     */
    wasForgotten(): boolean;
    /**
     * Gets the syntax kind.
     */
    getKind(): SyntaxKind;
    /**
     * Gets the syntax kind name.
     */
    getKindName(): string;
    /**
     * Prints the node using the compiler's printer.
     * @param options - Options.
     */
    print(options?: PrintNodeOptions): string;
    /**
     * Gets the symbol or throws an error if it doesn't exist.
     */
    getSymbolOrThrow(): Symbol;
    /**
     * Gets the compiler symbol or undefined if it doesn't exist.
     */
    getSymbol(): Symbol | undefined;
    /**
     * Gets the symbols in the scope of the node.
     *
     * Note: This will always return the local symbols. If you want the export symbol from a local symbol, then
     * use the `#getExportSymbol()` method on the symbol.
     * @param meaning - Meaning of symbol to filter by.
     */
    getSymbolsInScope(meaning: SymbolFlags): Symbol[];
    /**
     * Gets the specified local symbol by name or throws if it doesn't exist.
     *
     * WARNING: The symbol table of locals is not exposed publicly by the compiler. Use this at your own risk knowing it may break.
     * @param name - Name of the local symbol.
     */
    getLocalOrThrow(name: string): Symbol;
    /**
     * Gets the specified local symbol by name or returns undefined if it doesn't exist.
     *
     * WARNING: The symbol table of locals is not exposed publicly by the compiler. Use this at your own risk knowing it may break.
     * @param name - Name of the local symbol.
     */
    getLocal(name: string): Symbol | undefined;
    /**
     * Gets the symbols within the current scope.
     *
     * WARNING: The symbol table of locals is not exposed publicly by the compiler. Use this at your own risk knowing it may break.
     */
    getLocals(): Symbol[];
    /**
     * Gets the type of the node.
     */
    getType(): Type;
    /**
     * If the node contains the provided range (inclusive).
     * @param pos - Start position.
     * @param end - End position.
     */
    containsRange(pos: number, end: number): boolean;
    /**
     * Gets if the specified position is within a string.
     * @param pos - Position.
     */
    isInStringAtPos(pos: number): boolean;
    /**
     * Gets the first child by a condition or throws.
     * @param condition - Condition.
     */
    getFirstChildOrThrow<T extends Node>(condition?: (node: Node) => node is T): T;
    /**
     * Gets the first child by a condition or throws.
     * @param condition - Condition.
     */
    getFirstChildOrThrow(condition?: (node: Node) => boolean): Node;
    /**
     * Gets the first child by a condition.
     * @param condition - Condition.
     */
    getFirstChild<T extends Node>(condition?: (node: Node) => node is T): T | undefined;
    /**
     * Gets the first child by a condition.
     * @param condition - Condition.
     */
    getFirstChild(condition?: (node: Node) => boolean): Node | undefined;
    /**
     * Gets the last child by a condition or throws.
     * @param condition - Condition.
     */
    getLastChildOrThrow<T extends Node>(condition?: (node: Node) => node is T): T;
    /**
     * Gets the last child by a condition or throws.
     * @param condition - Condition.
     */
    getLastChildOrThrow(condition?: (node: Node) => boolean): Node;
    /**
     * Gets the last child by a condition.
     * @param condition - Condition.
     */
    getLastChild<T extends Node>(condition?: (node: Node) => node is T): T | undefined;
    /**
     * Gets the last child by a condition.
     * @param condition - Condition.
     */
    getLastChild(condition?: (node: Node) => boolean): Node | undefined;
    /**
     * Gets the first descendant by a condition or throws.
     * @param condition - Condition.
     */
    getFirstDescendantOrThrow<T extends Node>(condition?: (node: Node) => node is T): T;
    /**
     * Gets the first descendant by a condition or throws.
     * @param condition - Condition.
     */
    getFirstDescendantOrThrow(condition?: (node: Node) => boolean): Node;
    /**
     * Gets the first descendant by a condition.
     * @param condition - Condition.
     */
    getFirstDescendant<T extends Node>(condition?: (node: Node) => node is T): T | undefined;
    /**
     * Gets the first descendant by a condition.
     * @param condition - Condition.
     */
    getFirstDescendant(condition?: (node: Node) => boolean): Node | undefined;
    /**
     * Gets the previous sibling or throws.
     * @param condition - Optional condition for getting the previous sibling.
     */
    getPreviousSiblingOrThrow<T extends Node>(condition?: (node: Node) => node is T): T;
    /**
     * Gets the previous sibling or throws.
     * @param condition - Optional condition for getting the previous sibling.
     */
    getPreviousSiblingOrThrow(condition?: (node: Node) => boolean): Node;
    /**
     * Gets the previous sibling.
     * @param condition - Optional condition for getting the previous sibling.
     */
    getPreviousSibling<T extends Node>(condition?: (node: Node) => node is T): T | undefined;
    /**
     * Gets the previous sibling.
     * @param condition - Optional condition for getting the previous sibling.
     */
    getPreviousSibling(condition?: (node: Node) => boolean): Node | undefined;
    /**
     * Gets the next sibling or throws.
     * @param condition - Optional condition for getting the next sibling.
     */
    getNextSiblingOrThrow<T extends Node>(condition?: (node: Node) => node is T): T;
    /**
     * Gets the next sibling or throws.
     * @param condition - Optional condition for getting the next sibling.
     */
    getNextSiblingOrThrow(condition?: (node: Node) => boolean): Node;
    /**
     * Gets the next sibling.
     * @param condition - Optional condition for getting the next sibling.
     */
    getNextSibling<T extends Node>(condition?: (node: Node) => node is T): T | undefined;
    /**
     * Gets the next sibling.
     * @param condition - Optional condition for getting the next sibling.
     */
    getNextSibling(condition?: (node: Node) => boolean): Node | undefined;
    /**
     * Gets the previous siblings.
     *
     * Note: Closest sibling is the zero index.
     */
    getPreviousSiblings(): Node[];
    /**
     * Gets the next siblings.
     *
     * Note: Closest sibling is the zero index.
     */
    getNextSiblings(): Node[];
    /**
     * Gets all the children of the node.
     */
    getChildren(): Node[];
    /**
     * Gets the child at the specified index.
     * @param index - Index of the child.
     */
    getChildAtIndex(index: number): Node;
    /**
     * Gets the child syntax list or throws if it doesn't exist.
     */
    getChildSyntaxListOrThrow(): SyntaxList;
    /**
     * Gets the child syntax list if it exists.
     */
    getChildSyntaxList(): SyntaxList | undefined;
    /**
     * Invokes the `cbNode` callback for each child and the `cbNodeArray` for every array of nodes stored in properties of the node.
     * If `cbNodeArray` is not defined, then it will pass every element of the array to `cbNode`.
     * @returns The first truthy value returned by a callback.
     * @param cbNode - Callback invoked for each child.
     * @param cbNodeArray - Callback invoked for each array of nodes.
     */
    forEachChild<T>(cbNode: (node: Node) => T | undefined, cbNodeArray?: (nodes: Node[]) => T | undefined): T | undefined;
    /**
     * Invokes the `cbNode` callback for each descendant and the `cbNodeArray` for every array of nodes stored in properties of the node and descendant nodes.
     * If `cbNodeArray` is not defined, then it will pass every element of the array to `cbNode`.
     *
     * @returns The first truthy value returned by a callback.
     * @remarks There exists a `traversal` object on the second parameter that allows various control of iteration.
     * @param cbNode - Callback invoked for each descendant.
     * @param cbNodeArray - Callback invoked for each array of nodes.
     */
    forEachDescendant<T>(cbNode: (node: Node, traversal: ForEachDescendantTraversalControl) => T | undefined, cbNodeArray?: (nodes: Node[], traversal: ForEachDescendantTraversalControl) => T | undefined): T | undefined;
    /**
     * Gets the child nodes passed to the delegate of `node.forEachChild(child => {})` as an array.
     */
    forEachChildAsArray(): Node<ts.Node>[];
    /**
     * Gets the node's descendants.
     */
    getDescendants(): Node[];
    /**
     * Gets the node's descendant statements and any arrow function statement-like expressions (ex. returns the expression `5` in `() => 5`).
     */
    getDescendantStatements(): (Statement | Expression)[];
    /**
     * Gets the number of children the node has.
     */
    getChildCount(): number;
    /**
     * Gets the child at the provided text position, or undefined if not found.
     * @param pos - Text position to search for.
     */
    getChildAtPos(pos: number): Node | undefined;
    /**
     * Gets the most specific descendant at the provided text position, or undefined if not found.
     * @param pos - Text position to search for.
     */
    getDescendantAtPos(pos: number): Node | undefined;
    /**
     * Gets the most specific descendant at the provided start text position with the specified width, or undefined if not found.
     * @param start - Start text position to search for.
     * @param width - Text length of the node to search for.
     */
    getDescendantAtStartWithWidth(start: number, width: number): Node | undefined;
    /**
     * Gets the source file text position where the node starts that includes the leading trivia (comments and whitespace).
     */
    getPos(): number;
    /**
     * Gets the source file text position where the node ends.
     *
     * @remarks This does not include the following trivia (comments and whitespace).
     */
    getEnd(): number;
    /**
     * Gets the source file text position where the node starts that does not include the leading trivia (comments and whitespace).
     * @param includeJsDocComments - Whether to include the JS doc comments.
     */
    getStart(includeJsDocComments?: boolean): number;
    /**
     * Gets the source file text position of the end of the last significant token or the start of the source file.
     */
    getFullStart(): number;
    /**
     * Gets the first source file text position that is not whitespace taking into account comment nodes.
     */
    getNonWhitespaceStart(): number;
    /**
     * Gets the text length of the node without trivia.
     */
    getWidth(): number;
    /**
     * Gets the text length of the node with trivia.
     */
    getFullWidth(): number;
    /**
     * Gets the node's leading trivia's text length.
     */
    getLeadingTriviaWidth(): number;
    /**
     * Gets the text length from the end of the current node to the next significant token or new line.
     */
    getTrailingTriviaWidth(): number;
    /**
     * Gets the text position of the next significant token or new line.
     */
    getTrailingTriviaEnd(): number;
    /**
     * Gets the text without leading trivia (comments and whitespace).
     * @param includeJsDocComments - Whether to include the js doc comments when getting the text.
     */
    getText(includeJsDocComments?: boolean): string;
    /**
     * Gets the text without leading trivia (comments and whitespace).
     * @param options - Options for getting the text.
     */
    getText(options: {
            trimLeadingIndentation?: boolean;
            includeJsDocComments?: boolean;
        }): string;
    /**
     * Gets the full text with leading trivia (comments and whitespace).
     */
    getFullText(): string;
    /**
     * Gets the combined modifier flags.
     */
    getCombinedModifierFlags(): ts.ModifierFlags;
    /**
     * Gets the source file.
     */
    getSourceFile(): SourceFile;
    /**
     * Gets a compiler node property wrapped in a Node.
     * @param propertyName - Property name.
     */
    getNodeProperty<KeyType extends keyof LocalNodeType, LocalNodeType extends ts.Node = NodeType>(propertyName: KeyType): NodePropertyToWrappedType<LocalNodeType, KeyType>;
    /**
     * Goes up the tree getting all the parents in ascending order.
     */
    getAncestors(): Node[];
    /**
     * Get the node's parent.
     */
    getParent<T extends Node | undefined = NodeParentType<NodeType>>(): T;
    /**
     * Gets the parent or throws an error if it doesn't exist.
     */
    getParentOrThrow<T extends Node | undefined = NodeParentType<NodeType>>(): NonNullable<T>;
    /**
     * Goes up the parents (ancestors) of the node while a condition is true.
     * Throws if the initial parent doesn't match the condition.
     * @param condition - Condition that tests the parent to see if the expression is true.
     */
    getParentWhileOrThrow<T extends Node>(condition: (node: Node) => node is T): T;
    /**
     * Goes up the parents (ancestors) of the node while a condition is true.
     * Throws if the initial parent doesn't match the condition.
     * @param condition - Condition that tests the parent to see if the expression is true.
     */
    getParentWhileOrThrow(condition: (node: Node) => boolean): Node;
    /**
     * Goes up the parents (ancestors) of the node while a condition is true.
     * Returns undefined if the initial parent doesn't match the condition.
     * @param condition - Condition that tests the parent to see if the expression is true.
     */
    getParentWhile<T extends Node>(condition: (node: Node) => node is T): T | undefined;
    /**
     * Goes up the parents (ancestors) of the node while a condition is true.
     * Returns undefined if the initial parent doesn't match the condition.
     * @param condition - Condition that tests the parent to see if the expression is true.
     */
    getParentWhile(condition: (node: Node) => boolean): Node | undefined;
    /**
     * Goes up the parents (ancestors) of the node while the parent is the specified syntax kind.
     * Throws if the initial parent is not the specified syntax kind.
     * @param kind - Syntax kind to check for.
     */
    getParentWhileKindOrThrow<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind];
    /**
     * Goes up the parents (ancestors) of the node while the parent is the specified syntax kind.
     * Returns undefined if the initial parent is not the specified syntax kind.
     * @param kind - Syntax kind to check for.
     */
    getParentWhileKind<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind] | undefined;
    /**
     * Gets the last token of this node. Usually this is a close brace.
     */
    getLastToken(): Node;
    /**
     * Gets if this node is in a syntax list.
     */
    isInSyntaxList(): boolean;
    /**
     * Gets the parent if it's a syntax list or throws an error otherwise.
     */
    getParentSyntaxListOrThrow(): SyntaxList;
    /**
     * Gets the parent if it's a syntax list.
     */
    getParentSyntaxList(): SyntaxList | undefined;
    /**
     * Gets the child index of this node relative to the parent.
     */
    getChildIndex(): number;
    /**
     * Gets the indentation level of the current node.
     */
    getIndentationLevel(): number;
    /**
     * Gets the child indentation level of the current node.
     */
    getChildIndentationLevel(): number;
    /**
     * Gets the indentation text.
     * @param offset - Optional number of levels of indentation to add or remove.
     */
    getIndentationText(offset?: number): string;
    /**
     * Gets the next indentation level text.
     * @param offset - Optional number of levels of indentation to add or remove.
     */
    getChildIndentationText(offset?: number): string;
    /**
     * Gets the position of the start of the line that this node starts on.
     * @param includeJsDocComments - Whether to include the JS doc comments or not.
     */
    getStartLinePos(includeJsDocComments?: boolean): number;
    /**
     * Gets the line number at the start of the node.
     * @param includeJsDocComments - Whether to include the JS doc comments or not.
     */
    getStartLineNumber(includeJsDocComments?: boolean): number;
    /**
     * Gets the line number of the end of the node.
     */
    getEndLineNumber(): number;
    /**
     * Gets if this is the first node on the current line.
     */
    isFirstNodeOnLine(): boolean;
    /**
     * Replaces the text of the current node with new text.
     *
     * This will forget the current node and return a new node that can be asserted or type guarded to the correct type.
     * @param textOrWriterFunction - Text or writer function to replace with.
     * @returns The new node.
     */
    replaceWithText(textOrWriterFunction: string | WriterFunction): Node;
    /**
     * Prepends the specified whitespace to current node.
     * @param textOrWriterFunction - Text or writer function.
     */
    prependWhitespace(textOrWriterFunction: string | WriterFunction): void;
    /**
     * Appends the specified whitespace to current node.
     * @param textOrWriterFunction - Text or writer function.
     */
    appendWhitespace(textOrWriterFunction: string | WriterFunction): void;
    /**
     * Formats the node's text using the internal TypeScript formatting API.
     * @param settings - Format code settings.
     */
    formatText(settings?: FormatCodeSettings): void;
    /**
     * Transforms the node using the compiler api nodes and functions (experimental).
     *
     * WARNING: This will forget descendants of transformed nodes.
     * @example Increments all the numeric literals in a source file.
     * ```ts
     * sourceFile.transform(traversal => {
     *   const node = traversal.visitChildren(); // recommend always visiting the children first (post order)
     *   if (ts.isNumericLiteral(node))
     *     return ts.createNumericLiteral((parseInt(node.text, 10) + 1).toString());
     *   return node;
     * });
     * ```
     * @example Updates the class declaration node without visiting the children.
     * ```ts
     * const classDec = sourceFile.getClassOrThrow("MyClass");
     * classDec.transform(traversal => {
     *   const node = traversal.currentNode;
     *   return ts.updateClassDeclaration(node, undefined, undefined, ts.createIdentifier("MyUpdatedClass"), undefined, undefined, []);
     * });
     * ```
     */
    transform(visitNode: (traversal: TransformTraversalControl) => ts.Node): this;
    /**
     * Gets the leading comment ranges of the current node.
     */
    getLeadingCommentRanges(): CommentRange[];
    /**
     * Gets the trailing comment ranges of the current node.
     */
    getTrailingCommentRanges(): CommentRange[];
    /**
     * Gets the children based on a kind.
     * @param kind - Syntax kind.
     */
    getChildrenOfKind<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind][];
    /**
     * Gets the first child by syntax kind or throws an error if not found.
     * @param kind - Syntax kind.
     */
    getFirstChildByKindOrThrow<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind];
    /**
     * Gets the first child by syntax kind.
     * @param kind - Syntax kind.
     */
    getFirstChildByKind<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind] | undefined;
    /**
     * Gets the first child if it matches the specified syntax kind or throws an error if not found.
     * @param kind - Syntax kind.
     */
    getFirstChildIfKindOrThrow<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind];
    /**
     * Gets the first child if it matches the specified syntax kind.
     * @param kind - Syntax kind.
     */
    getFirstChildIfKind<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind] | undefined;
    /**
     * Gets the last child by syntax kind or throws an error if not found.
     * @param kind - Syntax kind.
     */
    getLastChildByKindOrThrow<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind];
    /**
     * Gets the last child by syntax kind.
     * @param kind - Syntax kind.
     */
    getLastChildByKind<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind] | undefined;
    /**
     * Gets the last child if it matches the specified syntax kind or throws an error if not found.
     * @param kind - Syntax kind.
     */
    getLastChildIfKindOrThrow<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind];
    /**
     * Gets the last child if it matches the specified syntax kind.
     * @param kind - Syntax kind.
     */
    getLastChildIfKind<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind] | undefined;
    /**
     * Gets the child at the specified index if it's the specified kind or throws an exception.
     * @param index - Child index to get.
     * @param kind - Expected kind.
     */
    getChildAtIndexIfKindOrThrow<TKind extends SyntaxKind>(index: number, kind: TKind): KindToNodeMappings[TKind];
    /**
     * Gets the child at the specified index if it's the specified kind or returns undefined.
     * @param index - Child index to get.
     * @param kind - Expected kind.
     */
    getChildAtIndexIfKind<TKind extends SyntaxKind>(index: number, kind: TKind): KindToNodeMappings[TKind] | undefined;
    /**
     * Gets the previous sibiling if it matches the specified kind, or throws.
     * @param kind - Kind to check.
     */
    getPreviousSiblingIfKindOrThrow<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind];
    /**
     * Gets the next sibiling if it matches the specified kind, or throws.
     * @param kind - Kind to check.
     */
    getNextSiblingIfKindOrThrow<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind];
    /**
     * Gets the previous sibling if it matches the specified kind.
     * @param kind - Kind to check.
     */
    getPreviousSiblingIfKind<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind] | undefined;
    /**
     * Gets the next sibling if it matches the specified kind.
     * @param kind - Kind to check.
     */
    getNextSiblingIfKind<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind] | undefined;
    /**
     * Gets the parent if it's a certain syntax kind.
     */
    getParentIfKind<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind] | undefined;
    /**
     * Gets the parent if it's a certain syntax kind of throws.
     */
    getParentIfKindOrThrow<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind];
    /**
     * Gets the first ancestor by syntax kind or throws if not found.
     * @param kind - Syntax kind.
     */
    getFirstAncestorByKindOrThrow<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind];
    /**
     * Get the first ancestor by syntax kind.
     * @param kind - Syntax kind.
     */
    getFirstAncestorByKind<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind] | undefined;
    /**
     * Gets the first ancestor that matches the provided condition or throws if not found.
     * @param condition - Condition to match.
     */
    getFirstAncestorOrThrow<T extends Node>(condition?: (node: Node) => node is T): T;
    /**
     * Gets the first ancestor that matches the provided condition or throws if not found.
     * @param condition - Condition to match.
     */
    getFirstAncestorOrThrow(condition?: (node: Node) => boolean): Node;
    /**
     * Gets the first ancestor that matches the provided condition or returns undefined if not found.
     * @param condition - Condition to match.
     */
    getFirstAncestor<T extends Node>(condition?: (node: Node) => node is T): T | undefined;
    /**
     * Gets the first ancestor that matches the provided condition or returns undefined if not found.
     * @param condition - Condition to match.
     */
    getFirstAncestor(condition?: (node: Node) => boolean): Node | undefined;
    /**
     * Gets the descendants that match a specified syntax kind.
     * @param kind - Kind to check.
     */
    getDescendantsOfKind<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind][];
    /**
     * Gets the first descendant by syntax kind or throws.
     * @param kind - Syntax kind.
     */
    getFirstDescendantByKindOrThrow<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind];
    /**
     * Gets the first descendant by syntax kind.
     * @param kind - Syntax kind.
     */
    getFirstDescendantByKind<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappings[TKind] | undefined;
}

export declare class QualifiedName extends Node<ts.QualifiedName> {
    /**
     * Gets the left side of the qualified name.
     */
    getLeft(): EntityName;
    /**
     * Gets the right identifier of the qualified name.
     */
    getRight(): Identifier;
}

export declare enum Scope {
    Public = "public",
    Protected = "protected",
    Private = "private"
}

export declare class SyntaxList extends Node<ts.SyntaxList> {
    /**
     * Adds text at the end of the current children.
     * @param textOrWriterFunction - Text to add or function that provides a writer to write with.
     * @returns The children that were added.
     */
    addChildText(textOrWriterFunction: string | WriterFunction | ReadonlyArray<string | WriterFunction>): Node<ts.Node>[];
    /**
     * Inserts text at the specified child index.
     * @param index - Child index to insert at.
     * @param textOrWriterFunction - Text to insert or function that provides a writer to write with.
     * @returns The children that were inserted.
     */
    insertChildText(index: number, textOrWriterFunction: string | WriterFunction | ReadonlyArray<string | WriterFunction>): Node<ts.Node>[];
}

export declare class TextRange<TRange extends ts.TextRange = ts.TextRange> {
    /**
     * Gets the underlying compiler object.
     */
    readonly compilerObject: TRange;
    private _throwIfForgotten;
    protected constructor();
    /**
     * Gets the source file of the text range.
     */
    getSourceFile(): SourceFile;
    /**
     * Gets the position.
     */
    getPos(): number;
    /**
     * Gets the end.
     */
    getEnd(): number;
    /**
     * Gets the width of the text range.
     */
    getWidth(): number;
    /**
     * Gets the text of the text range.
     */
    getText(): string;
    /**
     * Gets if the text range was forgotten.
     *
     * This will be true after any manipulations have occured to the source file this text range was generated from.
     */
    wasForgotten(): boolean;
}

export interface ForEachDescendantTraversalControl {
    /**
     * Stops traversal.
     */
    stop(): void;
    /**
     * Skips traversal of the current node's descendants.
     */
    skip(): void;
    /**
     * Skips traversal of the current node, siblings, and all their descendants.
     */
    up(): void;
}

export interface TransformTraversalControl {
    /**
     * The node currently being transformed.
     * @remarks Use the result of `.visitChildren()` instead before transforming if visiting the children.
     */
    currentNode: ts.Node;
    /**
     * Visits the children of the current node and returns a new node for the current node.
     */
    visitChildren(): ts.Node;
}

export declare type CompilerNodeToWrappedType<T extends ts.Node> = T extends ts.ObjectDestructuringAssignment ? ObjectDestructuringAssignment : T extends ts.ArrayDestructuringAssignment ? ArrayDestructuringAssignment : T extends ts.SuperElementAccessExpression ? SuperElementAccessExpression : T extends ts.SuperPropertyAccessExpression ? SuperPropertyAccessExpression : T extends ts.AssignmentExpression<infer U> ? AssignmentExpression<ts.AssignmentExpression<U>> : T["kind"] extends keyof ImplementedKindToNodeMappings ? ImplementedKindToNodeMappings[T["kind"]] : T extends ts.SyntaxList ? SyntaxList : T extends ts.JSDocTypeExpression ? JSDocTypeExpression : T extends ts.JSDocType ? JSDocType : T extends ts.TypeNode ? TypeNode : T extends ts.JSDocTag ? JSDocTag : T extends ts.LiteralExpression ? LiteralExpression : T extends ts.PrimaryExpression ? PrimaryExpression : T extends ts.MemberExpression ? MemberExpression : T extends ts.LeftHandSideExpression ? LeftHandSideExpression : T extends ts.UpdateExpression ? UpdateExpression : T extends ts.UnaryExpression ? UnaryExpression : T extends ts.Expression ? Expression : T extends ts.IterationStatement ? IterationStatement : T extends CompilerCommentStatement ? CommentStatement : T extends CompilerCommentClassElement ? CommentClassElement : T extends CompilerCommentTypeElement ? CommentTypeElement : T extends CompilerCommentObjectLiteralElement ? CommentObjectLiteralElement : T extends CompilerCommentEnumMember ? CommentEnumMember : T extends ts.TypeElement ? TypeElement : T extends ts.Statement ? Statement : T extends ts.ClassElement ? ClassElement : T extends ts.ObjectLiteralElement ? ObjectLiteralElement : Node<T>;
declare const DecoratorBase: typeof Node;

export declare class Decorator extends DecoratorBase<ts.Decorator> {
    /**
     * Gets the decorator name.
     */
    getName(): string;
    /**
     * Gets the name node of the decorator.
     */
    getNameNode(): Identifier;
    /**
     * Gets the full decorator name.
     */
    getFullName(): string;
    /**
     * Gets if the decorator is a decorator factory.
     */
    isDecoratorFactory(): boolean;
    /**
     * Set if this decorator is a decorator factory.
     * @param isDecoratorFactory - If it should be a decorator factory or not.
     */
    setIsDecoratorFactory(isDecoratorFactory: boolean): this;
    /**
     * Gets the call expression if a decorator factory, or throws.
     */
    getCallExpressionOrThrow(): CallExpression;
    /**
     * Gets the call expression if a decorator factory.
     */
    getCallExpression(): CallExpression | undefined;
    /**
     * Gets the expression.
     */
    getExpression(): Expression<ts.LeftHandSideExpression>;
    /**
     * Gets the decorator's arguments from its call expression.
     */
    getArguments(): Node[];
    /**
     * Gets the decorator's type arguments from its call expression.
     */
    getTypeArguments(): TypeNode[];
    /**
     * Adds a type argument.
     * @param argumentTexts - Argument text.
     */
    addTypeArgument(argumentText: string): TypeNode<ts.TypeNode>;
    /**
     * Adds type arguments.
     * @param argumentTexts - Argument texts.
     */
    addTypeArguments(argumentTexts: ReadonlyArray<string>): TypeNode<ts.TypeNode>[];
    /**
     * Inserts a type argument.
     * @param index - Child index to insert at.
     * @param argumentTexts - Argument text.
     */
    insertTypeArgument(index: number, argumentText: string): TypeNode<ts.TypeNode>;
    /**
     * Inserts type arguments.
     * @param index - Child index to insert at.
     * @param argumentTexts - Argument texts.
     */
    insertTypeArguments(index: number, argumentTexts: ReadonlyArray<string>): TypeNode<ts.TypeNode>[];
    /**
     * Removes a type argument.
     * @param typeArg - Type argument to remove.
     */
    removeTypeArgument(typeArg: Node): this;
    /**
     * Removes a type argument.
     * @param index - Index to remove.
     */
    removeTypeArgument(index: number): this;
    /**
     * Adds an argument.
     * @param argumentTexts - Argument text.
     */
    addArgument(argumentText: string | WriterFunction): Node<ts.Node>;
    /**
     * Adds arguments.
     * @param argumentTexts - Argument texts.
     */
    addArguments(argumentTexts: ReadonlyArray<string | WriterFunction> | WriterFunction): Node<ts.Node>[];
    /**
     * Inserts an argument.
     * @param index - Child index to insert at.
     * @param argumentTexts - Argument text.
     */
    insertArgument(index: number, argumentText: string | WriterFunction): Node<ts.Node>;
    /**
     * Inserts arguments.
     * @param index - Child index to insert at.
     * @param argumentTexts - Argument texts.
     */
    insertArguments(index: number, argumentTexts: ReadonlyArray<string | WriterFunction> | WriterFunction): Node<ts.Node>[];
    /**
     * Removes an argument based on the node.
     * @param node - Argument's node to remove.
     */
    removeArgument(node: Node): this;
    /**
     * Removes an argument based on the specified index.
     * @param index - Index to remove.
     */
    removeArgument(index: number): this;
    /**
     * Removes this decorator.
     */
    remove(): void;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<DecoratorStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): DecoratorStructure;
}

export declare function JSDocPropertyLikeTag<T extends Constructor<JSDocPropertyLikeTagExtensionType>>(Base: T): Constructor<JSDocPropertyLikeTag> & T;

export interface JSDocPropertyLikeTag {
    /**
     * Gets the type expression node of the JS doc property like tag.
     */
    getTypeExpression(): JSDocTypeExpression | undefined;
    /**
     * Gets the name of the JS doc property like tag.
     */
    getName(): string;
    /**
     * Gets the name node of the JS doc property like tag.
     */
    getNameNode(): EntityName;
    /**
     * Checks if the JS doc property like tag is bracketed.
     */
    isBracketed(): boolean;
}

declare type JSDocPropertyLikeTagExtensionType = Node<ts.JSDocPropertyLikeTag> & JSDocTag;
declare const JSDocBase: typeof Node;

/**
 * JS doc node.
 */
export declare class JSDoc extends JSDocBase<ts.JSDoc> {
    /**
     * Gets the tags of the JSDoc.
     */
    getTags(): JSDocTag[];
    /**
     * Gets the comment.
     */
    getComment(): string | undefined;
    /**
     * Gets the JSDoc's text without the surrounding comment.
     */
    getInnerText(): string;
    /**
     * Sets the comment.
     * @param textOrWriterFunction - Text or writer function to set.
     */
    setComment(textOrWriterFunction: string | WriterFunction): this;
    /**
     * Removes this JSDoc.
     */
    remove(): void;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<JSDocStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): JSDocStructure;
}

/**
 * JS doc augments tag node.
 */
export declare class JSDocAugmentsTag extends JSDocTag<ts.JSDocAugmentsTag> {
}

/**
 * JS doc class tag node.
 */
export declare class JSDocClassTag extends JSDocTag<ts.JSDocClassTag> {
}

declare const JSDocFunctionTypeBase: Constructor<SignaturedDeclaration> & typeof JSDocType;

/**
 * JS doc function type.
 */
export declare class JSDocFunctionType extends JSDocFunctionTypeBase<ts.JSDocFunctionType> {
}

declare const JSDocParameterTagBase: Constructor<JSDocPropertyLikeTag> & typeof JSDocTag;

/**
 * JS doc parameter tag node.
 */
export declare class JSDocParameterTag extends JSDocParameterTagBase<ts.JSDocParameterTag> {
}

declare const JSDocPropertyTagBase: Constructor<JSDocPropertyLikeTag> & typeof JSDocTag;

/**
 * JS doc property tag node.
 */
export declare class JSDocPropertyTag extends JSDocPropertyTagBase<ts.JSDocPropertyTag> {
}

/**
 * JS doc return tag node.
 */
export declare class JSDocReturnTag extends JSDocTag<ts.JSDocReturnTag> {
    /**
     * Gets the type expression node of the JS doc property return tag.
     */
    getTypeExpression(): JSDocTypeExpression | undefined;
}

/**
 * JS doc signature node.
 */
export declare class JSDocSignature extends JSDocType<ts.JSDocSignature> {
    /**
     * Gets the type node of the JS doc signature.
     */
    getTypeNode(): JSDocReturnTag | undefined;
}

/**
 * JS doc tag node.
 */
export declare class JSDocTag<NodeType extends ts.JSDocTag = ts.JSDocTag> extends Node<NodeType> {
    /**
     * Gets the tag's name as a string.
     */
    getTagName(): string;
    /**
     * Gets the tag name node.
     */
    getTagNameNode(): Identifier;
    /**
     * Gets the tag's comment.
     */
    getComment(): string | undefined;
}

/**
 * JS doc tag info.
 */
export declare class JSDocTagInfo {
    /**
     * Gets the compiler JS doc tag info.
     */
    readonly compilerObject: ts.JSDocTagInfo;
    private constructor();
    /**
     * Gets the name.
     */
    getName(): string;
    /**
     * Gets the text.
     */
    getText(): string | undefined;
}

/**
 * JS doc type node.
 */
export declare class JSDocType<T extends ts.JSDocType = ts.JSDocType> extends TypeNode<T> {
}

/**
 * JS doc type def tag node.
 */
export declare class JSDocTypedefTag extends JSDocTag<ts.JSDocTypedefTag> {
}

/**
 * JS doc type tag node.
 */
export declare class JSDocTypeTag extends JSDocTag<ts.JSDocTypeTag> {
    /**
     * Gets the type expression node of the JS doc property type tag.
     */
    getTypeExpression(): JSDocTypeExpression | undefined;
}

/**
 * JS doc unknown tag node.
 */
export declare class JSDocUnknownTag extends JSDocTag<ts.JSDocUnknownTag> {
}

/**
 * JS doc type expression node.
 */
export declare class JSDocTypeExpression extends TypeNode<ts.JSDocTypeExpression> {
    /**
     * Gets the type node of the JS doc type expression.
     */
    getTypeNode(): TypeNode<ts.TypeNode>;
}

export declare class CommentEnumMember extends Node<CompilerCommentEnumMember> {
    /**
     * Removes this enum member comment.
     */
    remove(): void;
}

declare const EnumDeclarationBase: Constructor<TextInsertableNode> & Constructor<NamespaceChildableNode> & Constructor<JSDocableNode> & Constructor<AmbientableNode> & Constructor<ExportableNode> & Constructor<ModifierableNode> & Constructor<NamedNode> & typeof Statement;

export declare class EnumDeclaration extends EnumDeclarationBase<ts.EnumDeclaration> {
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<EnumDeclarationStructure>): this;
    /**
     * Adds a member to the enum.
     * @param structure - Structure of the enum.
     */
    addMember(structure: OptionalKind<EnumMemberStructure>): EnumMember;
    /**
     * Adds a member to the enum.
     * @param structure - Structure of the enum.
     */
    addMember(structure: OptionalKind<EnumMemberStructure> | WriterFunction | string): EnumMember | CommentEnumMember;
    /**
     * Adds members to the enum.
     * @param structures - Structures of the enums.
     */
    addMembers(structures: ReadonlyArray<OptionalKind<EnumMemberStructure>>): EnumMember[];
    /**
     * Adds members to the enum.
     * @param structures - Structures of the enums.
     */
    addMembers(structures: ReadonlyArray<OptionalKind<EnumMemberStructure> | WriterFunction | string> | string | WriterFunction): (EnumMember | CommentEnumMember)[];
    /**
     * Inserts a member to the enum.
     * @param index - Child index to insert at.
     * @param structure - Structure of the enum.
     */
    insertMember(index: number, structure: OptionalKind<EnumMemberStructure>): EnumMember;
    /**
     * Inserts a member to the enum.
     * @param index - Child index to insert at.
     * @param structure - Structure of the enum.
     */
    insertMember(index: number, structure: OptionalKind<EnumMemberStructure> | WriterFunction | string): EnumMember | CommentEnumMember;
    /**
     * Inserts members to an enum.
     * @param index - Child index to insert at.
     * @param structures - Structures of the enums.
     */
    insertMembers(index: number, structures: ReadonlyArray<OptionalKind<EnumMemberStructure>>): EnumMember[];
    /**
     * Inserts members to an enum.
     * @param index - Child index to insert at.
     * @param structures - Structures of the enums.
     */
    insertMembers(index: number, structures: ReadonlyArray<OptionalKind<EnumMemberStructure> | WriterFunction | string> | WriterFunction | string): (EnumMember | CommentEnumMember)[];
    /**
     * Gets an enum member.
     * @param name - Name of the member.
     */
    getMember(name: string): EnumMember | undefined;
    /**
     * Gets an enum member.
     * @param findFunction - Function to use to find the member.
     */
    getMember(findFunction: (declaration: EnumMember) => boolean): EnumMember | undefined;
    /**
     * Gets an enum member or throws if not found.
     * @param name - Name of the member.
     */
    getMemberOrThrow(name: string): EnumMember;
    /**
     * Gets an enum member or throws if not found.
     * @param findFunction - Function to use to find the member.
     */
    getMemberOrThrow(findFunction: (declaration: EnumMember) => boolean): EnumMember;
    /**
     * Gets the enum's members.
     */
    getMembers(): EnumMember[];
    /**
     * Gets the enum's members with comment enum members.
     */
    getMembersWithComments(): (EnumMember | CommentEnumMember)[];
    /**
     * Toggle if it's a const enum.
     */
    setIsConstEnum(value: boolean): this;
    /**
     * Gets if it's a const enum.
     */
    isConstEnum(): boolean;
    /**
     * Gets the const enum keyword or undefined if not exists.
     */
    getConstKeyword(): Node<ts.Node> | undefined;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): EnumDeclarationStructure;
}

declare const EnumMemberBase: Constructor<JSDocableNode> & Constructor<InitializerExpressionableNode> & Constructor<PropertyNamedNode> & typeof Node;

export declare class EnumMember extends EnumMemberBase<ts.EnumMember> {
    /**
     * Gets the constant value of the enum.
     */
    getValue(): string | number | undefined;
    /**
     * Sets the enum value.
     *
     * This is a helper method. Use `#setInitializer` if you want to set the initializer
     * to something other than a string or number.
     * @param value - Enum value.
     */
    setValue(value: string | number): this;
    /**
     * Removes this enum member.
     */
    remove(): void;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<EnumMemberStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): EnumMemberStructure;
}

declare const ArrayDestructuringAssignmentBase: typeof AssignmentExpression;

export declare class ArrayDestructuringAssignment extends ArrayDestructuringAssignmentBase<ts.ArrayDestructuringAssignment> {
    /**
     * Gets the left array literal expression of the array destructuring assignment.
     */
    getLeft(): ArrayLiteralExpression;
}

export declare class ArrayLiteralExpression extends PrimaryExpression<ts.ArrayLiteralExpression> {
    /**
     * Gets the array's elements.
     */
    getElements(): Expression[];
    /**
     * Adds an element to the array.
     * @param textOrWriterFunction - Text to add as an element.
     * @param options - Options.
     */
    addElement(textOrWriterFunction: string | WriterFunction, options?: {
            useNewLines?: boolean;
        }): Expression<ts.Expression>;
    /**
     * Adds elements to the array.
     * @param textsOrWriterFunction - Texts to add as elements.
     * @param options - Options.
     */
    addElements(textsOrWriterFunction: ReadonlyArray<string | WriterFunction> | WriterFunction, options?: {
            useNewLines?: boolean;
        }): Expression<ts.Expression>[];
    /**
     * Insert an element into the array.
     * @param index - Child index to insert at.
     * @param text - Text to insert as an element.
     * @param options - Options.
     */
    insertElement(index: number, textOrWriterFunction: string | WriterFunction, options?: {
            useNewLines?: boolean;
        }): Expression<ts.Expression>;
    /**
     * Insert elements into the array.
     * @param index - Child index to insert at.
     * @param textsOrWriterFunction - Texts to insert as elements.
     * @param options - Options.
     */
    insertElements(index: number, textsOrWriterFunction: ReadonlyArray<string | WriterFunction> | WriterFunction, options?: {
            useNewLines?: boolean;
        }): Expression<ts.Expression>[];
    /**
     * Removes an element from the array.
     * @param index - Index to remove from.
     */
    removeElement(index: number): void;
    /**
     * Removes an element from the array.
     * @param element - Element to remove.
     */
    removeElement(element: Expression): void;
}

declare const AsExpressionBase: Constructor<TypedNode> & Constructor<ExpressionedNode> & typeof Expression;

export declare class AsExpression extends AsExpressionBase<ts.AsExpression> {
}

declare const AssignmentExpressionBase: typeof BinaryExpression;

export declare class AssignmentExpression<T extends ts.AssignmentExpression<ts.AssignmentOperatorToken> = ts.AssignmentExpression<ts.AssignmentOperatorToken>> extends AssignmentExpressionBase<T> {
    /**
     * Gets the operator token of the assignment expression.
     */
    getOperatorToken(): Node<ts.Token<ts.AssignmentOperator>>;
}

declare const AwaitExpressionBase: Constructor<UnaryExpressionedNode> & typeof UnaryExpression;

export declare class AwaitExpression extends AwaitExpressionBase<ts.AwaitExpression> {
}

declare const BinaryExpressionBase: typeof Expression;

export declare class BinaryExpression<T extends ts.BinaryExpression = ts.BinaryExpression> extends BinaryExpressionBase<T> {
    /**
     * Gets the left side of the binary expression.
     */
    getLeft(): Expression;
    /**
     * Gets the operator token of the binary expression.
     */
    getOperatorToken(): Node<ts.Token<ts.BinaryOperator>>;
    /**
     * Gets the right side of the binary expression.
     */
    getRight(): Expression;
}

declare const CallExpressionBase: Constructor<TypeArgumentedNode> & Constructor<ArgumentedNode> & Constructor<LeftHandSideExpressionedNode> & typeof LeftHandSideExpression;

export declare class CallExpression<T extends ts.CallExpression = ts.CallExpression> extends CallExpressionBase<T> {
    /**
     * Gets the return type of the call expression.
     */
    getReturnType(): Type;
}

declare const CommaListExpressionBase: typeof Expression;

export declare class CommaListExpression extends CommaListExpressionBase<ts.CommaListExpression> {
    /**
     * Gets the elements.
     */
    getElements(): Expression[];
}

declare const ConditionalExpressionBase: typeof Expression;

export declare class ConditionalExpression extends ConditionalExpressionBase<ts.ConditionalExpression> {
    /**
     * Gets the condition of the conditional expression.
     */
    getCondition(): Expression;
    /**
     * Gets the question token of the conditional expression.
     */
    getQuestionToken(): Node<ts.Token<SyntaxKind.QuestionToken>>;
    /**
     * Gets the when true expression of the conditional expression.
     */
    getWhenTrue(): Expression;
    /**
     * Gets the colon token of the conditional expression.
     */
    getColonToken(): Node<ts.Token<SyntaxKind.ColonToken>>;
    /**
     * Gets the when false expression of the conditional expression.
     */
    getWhenFalse(): Expression;
}

declare const DeleteExpressionBase: Constructor<UnaryExpressionedNode> & typeof UnaryExpression;

export declare class DeleteExpression extends DeleteExpressionBase<ts.DeleteExpression> {
}

declare const ElementAccessExpressionBase: Constructor<LeftHandSideExpressionedNode> & typeof MemberExpression;

export declare class ElementAccessExpression<T extends ts.ElementAccessExpression = ts.ElementAccessExpression> extends ElementAccessExpressionBase<T> {
    /**
     * Gets this element access expression's argument expression or undefined if none exists.
     */
    getArgumentExpression(): Expression | undefined;
    /**
     * Gets this element access expression's argument expression or throws if none exists.
     */
    getArgumentExpressionOrThrow(): Expression<ts.Expression>;
}

export declare class Expression<T extends ts.Expression = ts.Expression> extends Node<T> {
    /**
     * Gets the contextual type of the expression.
     */
    getContextualType(): Type | undefined;
}

export declare function ExpressionedNode<T extends Constructor<ExpressionedNodeExtensionType>>(Base: T): Constructor<ExpressionedNode> & T;

export interface ExpressionedNode {
    /**
     * Gets the expression.
     */
    getExpression(): Expression;
    /**
     * Sets the expression.
     * @param textOrWriterFunction - Text to set the expression with.
     */
    setExpression(textOrWriterFunction: string | WriterFunction): this;
}

declare type ExpressionedNodeExtensionType = Node<ts.Node & {
        expression: ts.Expression;
    }>;
export declare function ImportExpressionedNode<T extends Constructor<ImportExpressionedNodeExtensionType>>(Base: T): Constructor<ImportExpressionedNode> & T;

export interface ImportExpressionedNode {
    /**
     * Gets the expression.
     */
    getExpression(): ImportExpression;
}

declare type ImportExpressionedNodeExtensionType = Node<ts.Node & {
        expression: ts.ImportExpression;
    }>;
export declare function LeftHandSideExpressionedNode<T extends Constructor<LeftHandSideExpressionedNodeExtensionType>>(Base: T): Constructor<LeftHandSideExpressionedNode> & T;

export interface LeftHandSideExpressionedNode {
    /**
     * Gets the expression.
     */
    getExpression(): LeftHandSideExpression;
}

declare type LeftHandSideExpressionedNodeExtensionType = Node<ts.Node & {
        expression: ts.LeftHandSideExpression;
    }>;
export declare function SuperExpressionedNode<T extends Constructor<SuperExpressionedNodeExtensionType>>(Base: T): Constructor<SuperExpressionedNode> & T;

export interface SuperExpressionedNode {
    /**
     * Gets the expression.
     */
    getExpression(): SuperExpression;
}

declare type SuperExpressionedNodeExtensionType = Node<ts.Node & {
        expression: ts.SuperExpression;
    }>;
export declare function UnaryExpressionedNode<T extends Constructor<UnaryExpressionedNodeExtensionType>>(Base: T): Constructor<UnaryExpressionedNode> & T;

export interface UnaryExpressionedNode {
    /**
     * Gets the expression.
     */
    getExpression(): UnaryExpression;
}

declare type UnaryExpressionedNodeExtensionType = Node<ts.Node & {
        expression: ts.UnaryExpression;
    }>;
declare const ImportExpressionBase: typeof PrimaryExpression;

export declare class ImportExpression extends ImportExpressionBase<ts.ImportExpression> {
}

export declare class LeftHandSideExpression<T extends ts.LeftHandSideExpression = ts.LeftHandSideExpression> extends UpdateExpression<T> {
}

declare const LiteralExpressionBase: Constructor<LiteralLikeNode> & typeof PrimaryExpression;

export declare class LiteralExpression<T extends ts.LiteralExpression = ts.LiteralExpression> extends LiteralExpressionBase<T> {
}

export declare class MemberExpression<T extends ts.MemberExpression = ts.MemberExpression> extends LeftHandSideExpression<T> {
}

declare const MetaPropertyBase: Constructor<NamedNode> & typeof PrimaryExpression;

export declare class MetaProperty extends MetaPropertyBase<ts.MetaProperty> {
    /**
     * Gets the keyword token.
     */
    getKeywordToken(): SyntaxKind.ImportKeyword | SyntaxKind.NewKeyword;
}

declare const NewExpressionBase: Constructor<TypeArgumentedNode> & Constructor<ArgumentedNode> & Constructor<LeftHandSideExpressionedNode> & typeof PrimaryExpression;

export declare class NewExpression extends NewExpressionBase<ts.NewExpression> {
}

declare const NonNullExpressionBase: Constructor<ExpressionedNode> & typeof LeftHandSideExpression;

export declare class NonNullExpression extends NonNullExpressionBase<ts.NonNullExpression> {
}

export declare class CommentObjectLiteralElement extends ObjectLiteralElement<CompilerCommentObjectLiteralElement> {
}

declare const ObjectDestructuringAssignmentBase: typeof AssignmentExpression;

export declare class ObjectDestructuringAssignment extends ObjectDestructuringAssignmentBase<ts.ObjectDestructuringAssignment> {
    /**
     * Gets the left object literal expression of the object destructuring assignment.
     */
    getLeft(): ObjectLiteralExpression;
}

export declare class ObjectLiteralElement<T extends ts.ObjectLiteralElement = ts.ObjectLiteralElement> extends Node<T> {
    /**
     * Removes the object literal element from the object literal expression.
     */
    remove(): void;
}

declare const ObjectLiteralExpressionBase: typeof PrimaryExpression;

export declare class ObjectLiteralExpression extends ObjectLiteralExpressionBase<ts.ObjectLiteralExpression> {
    /**
     * Gets the first property by the provided name or throws.
     * @param name - Name of the property.
     */
    getPropertyOrThrow(name: string): ObjectLiteralElementLike;
    /**
     * Gets the first property that matches the provided find function or throws.
     * @param findFunction - Find function.
     */
    getPropertyOrThrow(findFunction: (property: ObjectLiteralElementLike) => boolean): ObjectLiteralElementLike;
    /**
     * Gets the first property by the provided name or returns undefined.
     * @param name - Name of the property.
     */
    getProperty(name: string): ObjectLiteralElementLike | undefined;
    /**
     * Gets the first property that matches the provided find function or returns undefined.
     * @param findFunction - Find function.
     */
    getProperty(findFunction: (property: ObjectLiteralElementLike) => boolean): ObjectLiteralElementLike | undefined;
    /**
     * Gets the properties.
     */
    getProperties(): ObjectLiteralElementLike[];
    /**
     * Gets the properties with comment object literal elements.
     */
    getPropertiesWithComments(): (ObjectLiteralElementLike | CommentObjectLiteralElement)[];
    /**
     * Adds the specified property to the object literal expression.
     *
     * Note: If you only want to add a property assignment, then it might be more convenient to use #addPropertyAssignment.
     * @structure - The structure to add.
     */
    addProperty(structure: string | WriterFunction | ObjectLiteralExpressionPropertyStructures): CommentObjectLiteralElement | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment;
    /**
     * Adds the specified properties to the object literal expression.
     *
     * Note: If you only want to add property assignments, then it might be more convenient to use #addPropertyAssignments.
     * @structures - The structures to add.
     */
    addProperties(structures: string | WriterFunction | ReadonlyArray<string | WriterFunction | ObjectLiteralExpressionPropertyStructures>): (CommentObjectLiteralElement | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment)[];
    /**
     * Inserts the specified property to the object literal expression.
     *
     * Note: If you only want to insert a property assignment, then it might be more convenient to use #insertPropertyAssignment.
     * @index - The index to insert at.
     * @structure - The structure to insert.
     */
    insertProperty(index: number, structure: string | WriterFunction | ObjectLiteralExpressionPropertyStructures): CommentObjectLiteralElement | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment;
    /**
     * Inserts the specified properties to the object literal expression.
     *
     * Note: If you only want to insert property assignments, then it might be more convenient to use #insertPropertyAssignments.
     * @index - The index to insert at.
     * @structures - The structures to insert.
     */
    insertProperties(index: number, structures: string | WriterFunction | ReadonlyArray<string | WriterFunction | ObjectLiteralExpressionPropertyStructures>): (CommentObjectLiteralElement | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment)[];
    /**
     * Adds a property assignment.
     * @param structure - Structure that represents the property assignment to add.
     */
    addPropertyAssignment(structure: OptionalKind<PropertyAssignmentStructure>): PropertyAssignment;
    /**
     * Adds property assignments.
     * @param structures - Structure that represents the property assignments to add.
     */
    addPropertyAssignments(structures: ReadonlyArray<OptionalKind<PropertyAssignmentStructure>>): PropertyAssignment[];
    /**
     * Inserts a property assignment at the specified index.
     * @param index - Child index to insert at.
     * @param structure - Structure that represents the property assignment to insert.
     */
    insertPropertyAssignment(index: number, structure: OptionalKind<PropertyAssignmentStructure>): PropertyAssignment;
    /**
     * Inserts property assignments at the specified index.
     * @param index - Child index to insert at.
     * @param structures - Structures that represent the property assignments to insert.
     */
    insertPropertyAssignments(index: number, structures: ReadonlyArray<OptionalKind<PropertyAssignmentStructure>>): PropertyAssignment[];
    /**
     * Adds a shorthand property assignment.
     * @param structure - Structure that represents the shorthand property assignment to add.
     */
    addShorthandPropertyAssignment(structure: OptionalKind<ShorthandPropertyAssignmentStructure>): ShorthandPropertyAssignment;
    /**
     * Adds shorthand property assignments.
     * @param structures - Structure that represents the shorthand property assignments to add.
     */
    addShorthandPropertyAssignments(structures: ReadonlyArray<OptionalKind<ShorthandPropertyAssignmentStructure>>): ShorthandPropertyAssignment[];
    /**
     * Inserts a shorthand property assignment at the specified index.
     * @param index - Child index to insert at.
     * @param structure - Structure that represents the shorthand property assignment to insert.
     */
    insertShorthandPropertyAssignment(index: number, structure: OptionalKind<ShorthandPropertyAssignmentStructure>): ShorthandPropertyAssignment;
    /**
     * Inserts shorthand property assignments at the specified index.
     * @param index - Child index to insert at.
     * @param structures - Structures that represent the shorthand property assignments to insert.
     */
    insertShorthandPropertyAssignments(index: number, structures: ReadonlyArray<OptionalKind<ShorthandPropertyAssignmentStructure>>): ShorthandPropertyAssignment[];
    /**
     * Adds a spread assignment.
     * @param structure - Structure that represents the spread assignment to add.
     */
    addSpreadAssignment(structure: OptionalKind<SpreadAssignmentStructure>): SpreadAssignment;
    /**
     * Adds spread assignments.
     * @param structures - Structure that represents the spread assignments to add.
     */
    addSpreadAssignments(structures: ReadonlyArray<OptionalKind<SpreadAssignmentStructure>>): SpreadAssignment[];
    /**
     * Inserts a spread assignment at the specified index.
     * @param index - Child index to insert at.
     * @param structure - Structure that represents the spread assignment to insert.
     */
    insertSpreadAssignment(index: number, structure: OptionalKind<SpreadAssignmentStructure>): SpreadAssignment;
    /**
     * Inserts spread assignments at the specified index.
     * @param index - Child index to insert at.
     * @param structures - Structures that represent the spread assignments to insert.
     */
    insertSpreadAssignments(index: number, structures: ReadonlyArray<OptionalKind<SpreadAssignmentStructure>>): SpreadAssignment[];
    /**
     * Adds a method.
     * @param structure - Structure that represents the method to add.
     */
    addMethod(structure: OptionalKind<MethodDeclarationStructure>): MethodDeclaration;
    /**
     * Adds methods.
     * @param structures - Structure that represents the methods to add.
     */
    addMethods(structures: ReadonlyArray<OptionalKind<MethodDeclarationStructure>>): MethodDeclaration[];
    /**
     * Inserts a method at the specified index.
     * @param index - Child index to insert at.
     * @param structure - Structure that represents the method to insert.
     */
    insertMethod(index: number, structure: OptionalKind<MethodDeclarationStructure>): MethodDeclaration;
    /**
     * Inserts methods at the specified index.
     * @param index - Child index to insert at.
     * @param structures - Structures that represent the methods to insert.
     */
    insertMethods(index: number, structures: ReadonlyArray<OptionalKind<MethodDeclarationStructure>>): MethodDeclaration[];
    /**
     * Adds a get accessor.
     * @param structure - Structure that represents the property assignment to add.
     */
    addGetAccessor(structure: OptionalKind<GetAccessorDeclarationStructure>): GetAccessorDeclaration;
    /**
     * Adds get accessors.
     * @param structures - Structure that represents the get accessors to add.
     */
    addGetAccessors(structures: ReadonlyArray<OptionalKind<GetAccessorDeclarationStructure>>): GetAccessorDeclaration[];
    /**
     * Inserts a get accessor at the specified index.
     * @param index - Child index to insert at.
     * @param structure - Structure that represents the get accessor to insert.
     */
    insertGetAccessor(index: number, structure: OptionalKind<GetAccessorDeclarationStructure>): GetAccessorDeclaration;
    /**
     * Inserts get accessors at the specified index.
     * @param index - Child index to insert at.
     * @param structures - Structures that represent the get accessors to insert.
     */
    insertGetAccessors(index: number, structures: ReadonlyArray<OptionalKind<GetAccessorDeclarationStructure>>): GetAccessorDeclaration[];
    /**
     * Adds a set accessor.
     * @param structure - Structure that represents the property assignment to add.
     */
    addSetAccessor(structure: OptionalKind<SetAccessorDeclarationStructure>): SetAccessorDeclaration;
    /**
     * Adds set accessors.
     * @param structures - Structure that represents the set accessors to add.
     */
    addSetAccessors(structures: ReadonlyArray<OptionalKind<SetAccessorDeclarationStructure>>): SetAccessorDeclaration[];
    /**
     * Inserts a set accessor at the specified index.
     * @param index - Child index to insert at.
     * @param structure - Structure that represents the set accessor to insert.
     */
    insertSetAccessor(index: number, structure: OptionalKind<SetAccessorDeclarationStructure>): SetAccessorDeclaration;
    /**
     * Inserts set accessors at the specified index.
     * @param index - Child index to insert at.
     * @param structures - Structures that represent the set accessors to insert.
     */
    insertSetAccessors(index: number, structures: ReadonlyArray<OptionalKind<SetAccessorDeclarationStructure>>): SetAccessorDeclaration[];
}

declare const PropertyAssignmentBase: Constructor<InitializerExpressionGetableNode> & Constructor<QuestionTokenableNode> & Constructor<PropertyNamedNode> & typeof ObjectLiteralElement;

export declare class PropertyAssignment extends PropertyAssignmentBase<ts.PropertyAssignment> {
    /**
     * Removes the initializer and returns the new shorthand property assignment.
     *
     * Note: The current node will no longer be valid because it's no longer a property assignment.
     */
    removeInitializer(): ShorthandPropertyAssignment;
    /**
     * Sets the initializer.
     * @param textOrWriterFunction - New text ot set for the initializer.
     */
    setInitializer(textOrWriterFunction: string | WriterFunction): this;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<PropertyAssignmentStructure>): this | ShorthandPropertyAssignment;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): PropertyAssignmentStructure;
}

declare const ShorthandPropertyAssignmentBase: Constructor<InitializerExpressionGetableNode> & Constructor<QuestionTokenableNode> & Constructor<NamedNode> & typeof ObjectLiteralElement;

export declare class ShorthandPropertyAssignment extends ShorthandPropertyAssignmentBase<ts.ShorthandPropertyAssignment> {
    /**
     * Gets if the shorthand property assignment has an object assignment initializer.
     */
    hasObjectAssignmentInitializer(): boolean;
    /**
     * Gets the object assignment initializer or throws if it doesn't exist.
     */
    getObjectAssignmentInitializerOrThrow(): Expression<ts.Expression>;
    /**
     * Gets the object assignment initializer if it exists.
     */
    getObjectAssignmentInitializer(): Expression | undefined;
    /**
     * Gets the equals token or throws if it doesn't exist.
     */
    getEqualsTokenOrThrow(): Node<ts.Token<SyntaxKind.EqualsToken>>;
    /**
     * Gets the equals token if it exists.
     */
    getEqualsToken(): Node<ts.Token<SyntaxKind.EqualsToken>> | undefined;
    /**
     * Remove the object assignment initializer.
     *
     * This is only useful to remove bad code.
     */
    removeObjectAssignmentInitializer(): this;
    /**
     * Sets the initializer.
     *
     * Note: The current node will no longer be valid because it's no longer a shorthand property assignment.
     * @param text - New text to set for the initializer.
     */
    setInitializer(text: string): PropertyAssignment;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<ShorthandPropertyAssignmentStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): ShorthandPropertyAssignmentStructure;
}

declare const SpreadAssignmentBase: Constructor<ExpressionedNode> & typeof ObjectLiteralElement;

export declare class SpreadAssignment extends SpreadAssignmentBase<ts.SpreadAssignment> {
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<SpreadAssignmentStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): SpreadAssignmentStructure;
}

declare const OmittedExpressionBase: typeof Expression;

export declare class OmittedExpression extends OmittedExpressionBase<ts.OmittedExpression> {
}

declare const ParenthesizedExpressionBase: Constructor<ExpressionedNode> & typeof Expression;

export declare class ParenthesizedExpression extends ParenthesizedExpressionBase<ts.ParenthesizedExpression> {
}

declare const PartiallyEmittedExpressionBase: Constructor<ExpressionedNode> & typeof Expression;

export declare class PartiallyEmittedExpression extends PartiallyEmittedExpressionBase<ts.PartiallyEmittedExpression> {
}

declare const PostfixUnaryExpressionBase: typeof UnaryExpression;

export declare class PostfixUnaryExpression extends PostfixUnaryExpressionBase<ts.PostfixUnaryExpression> {
    /**
     * Gets the operator token of the postfix unary expression.
     */
    getOperatorToken(): ts.PostfixUnaryOperator;
    /**
     * Gets the operand of the postfix unary expression.
     */
    getOperand(): LeftHandSideExpression;
}

declare const PrefixUnaryExpressionBase: typeof UnaryExpression;

export declare class PrefixUnaryExpression extends PrefixUnaryExpressionBase<ts.PrefixUnaryExpression> {
    /**
     * Gets the operator token of the prefix unary expression.
     */
    getOperatorToken(): ts.PrefixUnaryOperator;
    /**
     * Gets the operand of the prefix unary expression.
     */
    getOperand(): UnaryExpression;
}

export declare class PrimaryExpression<T extends ts.PrimaryExpression = ts.PrimaryExpression> extends MemberExpression<T> {
}

declare const PropertyAccessExpressionBase: Constructor<NamedNode> & Constructor<LeftHandSideExpressionedNode> & typeof MemberExpression;

export declare class PropertyAccessExpression<T extends ts.PropertyAccessExpression = ts.PropertyAccessExpression> extends PropertyAccessExpressionBase<T> {
}

declare const SpreadElementBase: Constructor<ExpressionedNode> & typeof Expression;

export declare class SpreadElement extends SpreadElementBase<ts.SpreadElement> {
}

declare const SuperElementAccessExpressionBase: Constructor<SuperExpressionedNode> & typeof ElementAccessExpression;

export declare class SuperElementAccessExpression extends SuperElementAccessExpressionBase<ts.SuperElementAccessExpression> {
}

declare const SuperExpressionBase: typeof PrimaryExpression;

export declare class SuperExpression extends SuperExpressionBase<ts.SuperExpression> {
}

declare const SuperPropertyAccessExpressionBase: Constructor<SuperExpressionedNode> & typeof PropertyAccessExpression;

export declare class SuperPropertyAccessExpression extends SuperPropertyAccessExpressionBase<ts.SuperPropertyAccessExpression> {
}

declare const ThisExpressionBase: typeof PrimaryExpression;

export declare class ThisExpression extends ThisExpressionBase<ts.ThisExpression> {
}

declare const TypeAssertionBase: Constructor<TypedNode> & Constructor<UnaryExpressionedNode> & typeof UnaryExpression;

export declare class TypeAssertion extends TypeAssertionBase<ts.TypeAssertion> {
}

declare const TypeOfExpressionBase: Constructor<UnaryExpressionedNode> & typeof UnaryExpression;

export declare class TypeOfExpression extends TypeOfExpressionBase<ts.TypeOfExpression> {
}

export declare class UnaryExpression<T extends ts.UnaryExpression = ts.UnaryExpression> extends Expression<T> {
}

export declare class UpdateExpression<T extends ts.UpdateExpression = ts.UpdateExpression> extends UnaryExpression<T> {
}

declare const VoidExpressionBase: Constructor<UnaryExpressionedNode> & typeof UnaryExpression;

export declare class VoidExpression extends VoidExpressionBase<ts.VoidExpression> {
}

declare const YieldExpressionBase: Constructor<GeneratorableNode> & typeof Expression;

export declare class YieldExpression extends YieldExpressionBase<ts.YieldExpression> {
    /**
     * Gets the expression or undefined of the yield expression.
     */
    getExpression(): Expression | undefined;
    /**
     * Gets the expression of the yield expression or throws if it does not exist.
     */
    getExpressionOrThrow(): Expression<ts.Expression>;
}

declare const ArrowFunctionBase: Constructor<TextInsertableNode> & Constructor<BodiedNode> & Constructor<AsyncableNode> & Constructor<FunctionLikeDeclaration> & typeof Expression;

export declare class ArrowFunction extends ArrowFunctionBase<ts.ArrowFunction> {
    /**
     * Gets the equals greater than token of the arrow function.
     */
    getEqualsGreaterThan(): Node<ts.Token<SyntaxKind.EqualsGreaterThanToken>>;
}

declare const FunctionDeclarationBase: Constructor<UnwrappableNode> & Constructor<TextInsertableNode> & Constructor<OverloadableNode> & Constructor<BodyableNode> & Constructor<AsyncableNode> & Constructor<GeneratorableNode> & Constructor<AmbientableNode> & Constructor<ExportableNode> & Constructor<FunctionLikeDeclaration> & Constructor<NamespaceChildableNode> & Constructor<NameableNode> & typeof Statement;
declare const FunctionDeclarationOverloadBase: Constructor<UnwrappableNode> & Constructor<TextInsertableNode> & Constructor<AsyncableNode> & Constructor<GeneratorableNode> & Constructor<ModifierableNode> & Constructor<SignaturedDeclaration> & Constructor<AmbientableNode> & Constructor<NamespaceChildableNode> & Constructor<JSDocableNode> & Constructor<TypeParameteredNode> & Constructor<ExportableNode> & typeof Statement;

export declare class FunctionDeclaration extends FunctionDeclarationBase<ts.FunctionDeclaration> {
    /**
     * Adds a function overload.
     * @param structure - Structure of the overload.
     */
    addOverload(structure: OptionalKind<FunctionDeclarationOverloadStructure>): FunctionDeclaration;
    /**
     * Adds function overloads.
     * @param structures - Structures of the overloads.
     */
    addOverloads(structures: ReadonlyArray<OptionalKind<FunctionDeclarationOverloadStructure>>): FunctionDeclaration[];
    /**
     * Inserts a function overload.
     * @param index - Child index to insert at.
     * @param structure - Structure of the overload.
     */
    insertOverload(index: number, structure: OptionalKind<FunctionDeclarationOverloadStructure>): FunctionDeclaration;
    /**
     * Inserts function overloads.
     * @param index - Child index to insert at.
     * @param structure - Structures of the overloads.
     */
    insertOverloads(index: number, structures: ReadonlyArray<OptionalKind<FunctionDeclarationOverloadStructure>>): FunctionDeclaration[];
    /**
     * Removes this function declaration.
     */
    remove(): void;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<FunctionDeclarationStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): FunctionDeclarationStructure | FunctionDeclarationOverloadStructure;
}

declare const FunctionExpressionBase: Constructor<JSDocableNode> & Constructor<TextInsertableNode> & Constructor<BodiedNode> & Constructor<AsyncableNode> & Constructor<GeneratorableNode> & Constructor<StatementedNode> & Constructor<TypeParameteredNode> & Constructor<SignaturedDeclaration> & Constructor<ModifierableNode> & Constructor<NameableNode> & typeof PrimaryExpression;

export declare class FunctionExpression extends FunctionExpressionBase<ts.FunctionExpression> {
}

export declare function FunctionLikeDeclaration<T extends Constructor<FunctionLikeDeclarationExtensionType>>(Base: T): Constructor<FunctionLikeDeclaration> & T;

export interface FunctionLikeDeclaration extends JSDocableNode, TypeParameteredNode, SignaturedDeclaration, StatementedNode, ModifierableNode {
}

declare type FunctionLikeDeclarationExtensionType = Node<ts.FunctionLikeDeclaration>;
export declare function OverloadableNode<T extends Constructor<OverloadableNodeExtensionType>>(Base: T): Constructor<OverloadableNode> & T;

/**
 * Node that supports overloads.
 */
export interface OverloadableNode {
    /**
     * Gets all the overloads associated with this node.
     */
    getOverloads(): this[];
    /**
     * Gets the implementation or undefined if it doesn't exist.
     */
    getImplementation(): this | undefined;
    /**
     * Gets the implementation or throws if it doesn't exist.
     */
    getImplementationOrThrow(): this;
    /**
     * Gets if this is not the implementation.
     */
    isOverload(): boolean;
    /**
     * Gets if this is the implementation.
     */
    isImplementation(): boolean;
}

declare type OverloadableNodeExtensionType = Node & BodyableNode;
declare const ParameterDeclarationBase: Constructor<QuestionTokenableNode> & Constructor<DecoratableNode> & Constructor<ScopeableNode> & Constructor<ReadonlyableNode> & Constructor<ModifierableNode> & Constructor<TypedNode> & Constructor<InitializerExpressionableNode> & Constructor<BindingNamedNode> & typeof Node;

export declare class ParameterDeclaration extends ParameterDeclarationBase<ts.ParameterDeclaration> {
    /**
     * Gets the dot dot dot token (...) if it exists, for a rest parameter.
     */
    getDotDotDotToken(): Node<ts.Token<SyntaxKind.DotDotDotToken>> | undefined;
    /**
     * Gets if it's a rest parameter.
     */
    isRestParameter(): boolean;
    /**
     * Gets if this is a property with a scope or readonly keyword (found in class constructors).
     */
    isParameterProperty(): boolean;
    /**
     * Sets if it's a rest parameter.
     * @param value - Sets if it's a rest parameter or not.
     */
    setIsRestParameter(value: boolean): this;
    /**
     * Gets if it's optional.
     */
    isOptional(): boolean;
    /**
     * Remove this parameter.
     */
    remove(): void;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<ParameterDeclarationStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): ParameterDeclarationStructure;
    /**
     * Sets if this node has a question token.
     * @param value - If it should have a question token or not.
     */
    setHasQuestionToken(value: boolean): this;
    /**
     * Sets the initializer.
     * @param text - Text or writer function to set for the initializer.
     */
    setInitializer(textOrWriterFunction: string | WriterFunction): this;
    /**
     * Sets the type.
     * @param textOrWriterFunction - Text or writer function to set the type with.
     */
    setType(textOrWriterFunction: string | WriterFunction): this;
}

export declare class HeritageClause extends Node<ts.HeritageClause> {
    /**
     * Gets all the type nodes for the heritage clause.
     */
    getTypeNodes(): ExpressionWithTypeArguments[];
    /**
     * Gets the heritage clause token.
     */
    getToken(): SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword;
    /**
     * Remove the expression from the heritage clause.
     * @param index - Index of the expression to remove.
     */
    removeExpression(index: number): this;
    /**
     * Removes the expression from the heritage clause.
     * @param expressionNode - Expression to remove.
     */
    removeExpression(expressionNode: ExpressionWithTypeArguments): this;
}

declare const CallSignatureDeclarationBase: Constructor<TypeParameteredNode> & Constructor<ChildOrderableNode> & Constructor<JSDocableNode> & Constructor<SignaturedDeclaration> & typeof TypeElement;

export declare class CallSignatureDeclaration extends CallSignatureDeclarationBase<ts.CallSignatureDeclaration> {
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<CallSignatureDeclarationStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): CallSignatureDeclarationStructure;
}

export declare class CommentTypeElement extends TypeElement<CompilerCommentTypeElement> {
}

declare const ConstructSignatureDeclarationBase: Constructor<TypeParameteredNode> & Constructor<ChildOrderableNode> & Constructor<JSDocableNode> & Constructor<SignaturedDeclaration> & typeof TypeElement;

export declare class ConstructSignatureDeclaration extends ConstructSignatureDeclarationBase<ts.ConstructSignatureDeclaration> {
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<ConstructSignatureDeclarationStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): ConstructSignatureDeclarationStructure;
}

declare const IndexSignatureDeclarationBase: Constructor<ReturnTypedNode> & Constructor<ChildOrderableNode> & Constructor<JSDocableNode> & Constructor<ReadonlyableNode> & Constructor<ModifierableNode> & typeof TypeElement;

export declare class IndexSignatureDeclaration extends IndexSignatureDeclarationBase<ts.IndexSignatureDeclaration> {
    /**
     * Gets the key name.
     */
    getKeyName(): string;
    /**
     * Sets the key name.
     * @param name - New name.
     */
    setKeyName(name: string): void;
    /**
     * Gets the key name node.
     */
    getKeyNameNode(): BindingName;
    /**
     * Gets the key type.
     */
    getKeyType(): Type;
    /**
     * Sets the key type.
     * @param type - Type.
     */
    setKeyType(type: string): this;
    /**
     * Gets the key type node.
     */
    getKeyTypeNode(): TypeNode;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<IndexSignatureDeclarationStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): IndexSignatureDeclarationStructure;
}

declare const InterfaceDeclarationBase: Constructor<TypeElementMemberedNode> & Constructor<TextInsertableNode> & Constructor<ExtendsClauseableNode> & Constructor<HeritageClauseableNode> & Constructor<TypeParameteredNode> & Constructor<JSDocableNode> & Constructor<AmbientableNode> & Constructor<NamespaceChildableNode> & Constructor<ExportableNode> & Constructor<ModifierableNode> & Constructor<NamedNode> & typeof Statement;

export declare class InterfaceDeclaration extends InterfaceDeclarationBase<ts.InterfaceDeclaration> {
    /**
     * Gets the base types.
     */
    getBaseTypes(): Type[];
    /**
     * Gets the base declarations.
     */
    getBaseDeclarations(): (TypeAliasDeclaration | InterfaceDeclaration | ClassDeclaration)[];
    /**
     * Gets all the implementations of the interface.
     *
     * This is similar to "go to implementation."
     */
    getImplementations(): ImplementationLocation[];
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<InterfaceDeclarationStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): InterfaceDeclarationStructure;
}

declare const MethodSignatureBase: Constructor<ChildOrderableNode> & Constructor<JSDocableNode> & Constructor<QuestionTokenableNode> & Constructor<TypeParameteredNode> & Constructor<SignaturedDeclaration> & Constructor<PropertyNamedNode> & typeof TypeElement;

export declare class MethodSignature extends MethodSignatureBase<ts.MethodSignature> {
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<MethodSignatureStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): MethodSignatureStructure;
}

declare const PropertySignatureBase: Constructor<ChildOrderableNode> & Constructor<JSDocableNode> & Constructor<ReadonlyableNode> & Constructor<QuestionTokenableNode> & Constructor<InitializerExpressionableNode> & Constructor<TypedNode> & Constructor<PropertyNamedNode> & Constructor<ModifierableNode> & typeof TypeElement;

export declare class PropertySignature extends PropertySignatureBase<ts.PropertySignature> {
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<PropertySignatureStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): PropertySignatureStructure;
}

export declare class TypeElement<TNode extends ts.TypeElement = ts.TypeElement> extends Node<TNode> {
    /**
     * Removes the member.
     */
    remove(): void;
}

export declare function JsxAttributedNode<T extends Constructor<JsxAttributedNodeExtensionType>>(Base: T): Constructor<JsxAttributedNode> & T;

export interface JsxAttributedNode {
    /**
     * Gets the JSX element's attributes.
     */
    getAttributes(): JsxAttributeLike[];
    /**
     * Gets an attribute by name or returns undefined when it can't be found.
     * @param name - Name to search for.
     */
    getAttribute(name: string): JsxAttributeLike | undefined;
    /**
     * Gets an attribute by a find function or returns undefined when it can't be found.
     * @param findFunction - Find function.
     */
    getAttribute(findFunction: (attribute: JsxAttributeLike) => boolean): JsxAttributeLike | undefined;
    /**
     * Gets an attribute by name or throws when it can't be found.
     * @param name - Name to search for.
     */
    getAttributeOrThrow(name: string): JsxAttributeLike;
    /**
     * Gets an attribute by a find function or throws when it can't be found.
     * @param findFunction - Find function.
     */
    getAttributeOrThrow(findFunction: (attribute: JsxAttributeLike) => boolean): JsxAttributeLike;
    /**
     * Adds an attribute into the element.
     */
    addAttribute(attribute: OptionalKind<JsxAttributeStructure> | OptionalKind<JsxSpreadAttributeStructure>): JsxAttributeLike;
    /**
     * Adds attributes into the element.
     */
    addAttributes(attributes: ReadonlyArray<OptionalKind<JsxAttributeStructure> | OptionalKind<JsxSpreadAttributeStructure>>): JsxAttributeLike[];
    /**
     * Inserts an attribute into the element.
     */
    insertAttribute(index: number, attribute: OptionalKind<JsxAttributeStructure> | OptionalKind<JsxSpreadAttributeStructure>): JsxAttributeLike;
    /**
     * Inserts attributes into the element.
     */
    insertAttributes(index: number, attributes: ReadonlyArray<OptionalKind<JsxAttributeStructure> | OptionalKind<JsxSpreadAttributeStructure>>): JsxAttributeLike[];
}

declare type JsxAttributedNodeExtensionType = Node<ts.Node & {
        attributes: ts.JsxAttributes;
    }> & JsxTagNamedNode;
export declare function JsxTagNamedNode<T extends Constructor<JsxTagNamedNodeExtensionType>>(Base: T): Constructor<JsxTagNamedNode> & T;

export interface JsxTagNamedNode {
    /**
     * Gets the tag name of the JSX closing element.
     */
    getTagNameNode(): JsxTagNameExpression;
}

declare type JsxTagNamedNodeExtensionType = Node<ts.Node & {
        tagName: ts.JsxTagNameExpression;
    }>;
declare const JsxAttributeBase: Constructor<NamedNode> & typeof Node;

export declare class JsxAttribute extends JsxAttributeBase<ts.JsxAttribute> {
    /**
     * Gets the JSX attribute's initializer or throws if it doesn't exist.
     */
    getInitializerOrThrow(): StringLiteral | JsxExpression;
    /**
     * Gets the JSX attribute's initializer or returns undefined if it doesn't exist.
     */
    getInitializer(): StringLiteral | JsxExpression | undefined;
    /**
     * Sets the initializer.
     * @param textOrWriterFunction - Text or writer function to set the initializer with.
     * @remarks You need to provide the quotes or braces.
     */
    setInitializer(textOrWriterFunction: string | WriterFunction): this;
    /**
     * Removes the initializer.
     */
    removeInitializer(): this;
    /**
     * Removes the JSX attribute.
     */
    remove(): void;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<JsxAttributeStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): JsxAttributeStructure;
}

declare const JsxClosingElementBase: Constructor<JsxTagNamedNode> & typeof Node;

export declare class JsxClosingElement extends JsxClosingElementBase<ts.JsxClosingElement> {
}

export declare class JsxClosingFragment extends Expression<ts.JsxClosingFragment> {
}

declare const JsxElementBase: typeof PrimaryExpression;

export declare class JsxElement extends JsxElementBase<ts.JsxElement> {
    /**
     * Gets the children of the JSX element.
     */
    getJsxChildren(): JsxChild[];
    /**
     * Gets the opening element.
     */
    getOpeningElement(): JsxOpeningElement;
    /**
     * Gets the closing element.
     */
    getClosingElement(): JsxClosingElement;
    /**
     * Sets the body text.
     * @param textOrWriterFunction - Text or writer function to set as the body.
     */
    setBodyText(textOrWriterFunction: string | WriterFunction): this;
    /**
     * Sets the body text without surrounding new lines.
     * @param textOrWriterFunction - Text to set as the body.
     */
    setBodyTextInline(textOrWriterFunction: string | WriterFunction): this;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<JsxElementStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): JsxElementStructure;
}

export declare class JsxExpression extends Expression<ts.JsxExpression> {
    /**
     * Gets the dot dot dot token (...) or throws if it doesn't exist.
     */
    getDotDotDotTokenOrThrow(): Node<ts.Token<SyntaxKind.DotDotDotToken>>;
    /**
     * Gets the dot dot dot token (...) or returns undefined if it doesn't exist.
     */
    getDotDotDotToken(): Node<ts.Token<SyntaxKind.DotDotDotToken>> | undefined;
    /**
     * Gets the expression or throws if it doesn't exist.
     */
    getExpressionOrThrow(): Expression<ts.Expression>;
    /**
     * Gets the expression or returns undefined if it doesn't exist
     */
    getExpression(): Expression | undefined;
}

export declare class JsxFragment extends PrimaryExpression<ts.JsxFragment> {
    /**
     * Gets the children of the JSX fragment.
     */
    getJsxChildren(): JsxChild[];
    /**
     * Gets the opening fragment.
     */
    getOpeningFragment(): JsxOpeningFragment;
    /**
     * Gets the closing fragment.
     */
    getClosingFragment(): JsxClosingFragment;
}

declare const JsxOpeningElementBase: Constructor<JsxAttributedNode> & Constructor<JsxTagNamedNode> & typeof Expression;

export declare class JsxOpeningElement extends JsxOpeningElementBase<ts.JsxOpeningElement> {
}

export declare class JsxOpeningFragment extends Expression<ts.JsxOpeningFragment> {
}

declare const JsxSelfClosingElementBase: Constructor<JsxAttributedNode> & Constructor<JsxTagNamedNode> & typeof PrimaryExpression;

export declare class JsxSelfClosingElement extends JsxSelfClosingElementBase<ts.JsxSelfClosingElement> {
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<JsxSelfClosingElementStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): JsxSelfClosingElementStructure;
}

declare const JsxSpreadAttributeBase: typeof Node;

export declare class JsxSpreadAttribute extends JsxSpreadAttributeBase<ts.JsxSpreadAttribute> {
    /**
     * Gets the JSX spread attribute's expression.
     */
    getExpression(): Expression<ts.Expression>;
    /**
     * Sets the expression.
     * @param textOrWriterFunction - Text to set the expression with.
     */
    setExpression(textOrWriterFunction: string | WriterFunction): this;
    /**
     * Removes the JSX spread attribute.
     */
    remove(): void;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<JsxSpreadAttributeStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): JsxSpreadAttributeStructure;
}

declare const JsxTextBase: Constructor<LiteralLikeNode> & typeof Node;

export declare class JsxText extends JsxTextBase<ts.JsxText> {
    /**
     * Gets if the JSX text contains only white spaces.
     */
    containsOnlyTriviaWhiteSpaces(): boolean;
}

export interface ImplementedKindToNodeMappings {
    [SyntaxKind.SourceFile]: SourceFile;
    [SyntaxKind.ArrayBindingPattern]: ArrayBindingPattern;
    [SyntaxKind.ArrayLiteralExpression]: ArrayLiteralExpression;
    [SyntaxKind.ArrayType]: ArrayTypeNode;
    [SyntaxKind.ArrowFunction]: ArrowFunction;
    [SyntaxKind.AsExpression]: AsExpression;
    [SyntaxKind.AwaitExpression]: AwaitExpression;
    [SyntaxKind.BindingElement]: BindingElement;
    [SyntaxKind.BinaryExpression]: BinaryExpression;
    [SyntaxKind.Block]: Block;
    [SyntaxKind.BreakStatement]: BreakStatement;
    [SyntaxKind.CallExpression]: CallExpression;
    [SyntaxKind.CallSignature]: CallSignatureDeclaration;
    [SyntaxKind.CaseBlock]: CaseBlock;
    [SyntaxKind.CaseClause]: CaseClause;
    [SyntaxKind.CatchClause]: CatchClause;
    [SyntaxKind.ClassDeclaration]: ClassDeclaration;
    [SyntaxKind.ClassExpression]: ClassExpression;
    [SyntaxKind.ConditionalType]: ConditionalTypeNode;
    [SyntaxKind.Constructor]: ConstructorDeclaration;
    [SyntaxKind.ConstructorType]: ConstructorTypeNode;
    [SyntaxKind.ConstructSignature]: ConstructSignatureDeclaration;
    [SyntaxKind.ContinueStatement]: ContinueStatement;
    [SyntaxKind.CommaListExpression]: CommaListExpression;
    [SyntaxKind.ComputedPropertyName]: ComputedPropertyName;
    [SyntaxKind.ConditionalExpression]: ConditionalExpression;
    [SyntaxKind.DebuggerStatement]: DebuggerStatement;
    [SyntaxKind.Decorator]: Decorator;
    [SyntaxKind.DefaultClause]: DefaultClause;
    [SyntaxKind.DeleteExpression]: DeleteExpression;
    [SyntaxKind.DoStatement]: DoStatement;
    [SyntaxKind.ElementAccessExpression]: ElementAccessExpression;
    [SyntaxKind.EmptyStatement]: EmptyStatement;
    [SyntaxKind.EnumDeclaration]: EnumDeclaration;
    [SyntaxKind.EnumMember]: EnumMember;
    [SyntaxKind.ExportAssignment]: ExportAssignment;
    [SyntaxKind.ExportDeclaration]: ExportDeclaration;
    [SyntaxKind.ExportSpecifier]: ExportSpecifier;
    [SyntaxKind.ExpressionWithTypeArguments]: ExpressionWithTypeArguments;
    [SyntaxKind.ExpressionStatement]: ExpressionStatement;
    [SyntaxKind.ExternalModuleReference]: ExternalModuleReference;
    [SyntaxKind.QualifiedName]: QualifiedName;
    [SyntaxKind.FirstNode]: QualifiedName;
    [SyntaxKind.ForInStatement]: ForInStatement;
    [SyntaxKind.ForOfStatement]: ForOfStatement;
    [SyntaxKind.ForStatement]: ForStatement;
    [SyntaxKind.FunctionDeclaration]: FunctionDeclaration;
    [SyntaxKind.FunctionExpression]: FunctionExpression;
    [SyntaxKind.FunctionType]: FunctionTypeNode;
    [SyntaxKind.GetAccessor]: GetAccessorDeclaration;
    [SyntaxKind.HeritageClause]: HeritageClause;
    [SyntaxKind.Identifier]: Identifier;
    [SyntaxKind.IfStatement]: IfStatement;
    [SyntaxKind.ImportClause]: ImportClause;
    [SyntaxKind.ImportDeclaration]: ImportDeclaration;
    [SyntaxKind.ImportEqualsDeclaration]: ImportEqualsDeclaration;
    [SyntaxKind.ImportSpecifier]: ImportSpecifier;
    [SyntaxKind.ImportType]: ImportTypeNode;
    [SyntaxKind.LastTypeNode]: ImportTypeNode;
    [SyntaxKind.IndexedAccessType]: IndexedAccessTypeNode;
    [SyntaxKind.IndexSignature]: IndexSignatureDeclaration;
    [SyntaxKind.InferType]: InferTypeNode;
    [SyntaxKind.InterfaceDeclaration]: InterfaceDeclaration;
    [SyntaxKind.IntersectionType]: IntersectionTypeNode;
    [SyntaxKind.JSDocAugmentsTag]: JSDocAugmentsTag;
    [SyntaxKind.JSDocClassTag]: JSDocClassTag;
    [SyntaxKind.JSDocFunctionType]: JSDocFunctionType;
    [SyntaxKind.JSDocReturnTag]: JSDocReturnTag;
    [SyntaxKind.JSDocSignature]: JSDocSignature;
    [SyntaxKind.JSDocTag]: JSDocUnknownTag;
    [SyntaxKind.FirstJSDocTagNode]: JSDocUnknownTag;
    [SyntaxKind.JSDocTypeExpression]: JSDocTypeExpression;
    [SyntaxKind.FirstJSDocNode]: JSDocTypeExpression;
    [SyntaxKind.JSDocTypeTag]: JSDocTypeTag;
    [SyntaxKind.JSDocTypedefTag]: JSDocTypedefTag;
    [SyntaxKind.JSDocParameterTag]: JSDocParameterTag;
    [SyntaxKind.JSDocPropertyTag]: JSDocPropertyTag;
    [SyntaxKind.LastJSDocNode]: JSDocPropertyTag;
    [SyntaxKind.LastJSDocTagNode]: JSDocPropertyTag;
    [SyntaxKind.JsxAttribute]: JsxAttribute;
    [SyntaxKind.JsxClosingElement]: JsxClosingElement;
    [SyntaxKind.JsxClosingFragment]: JsxClosingFragment;
    [SyntaxKind.JsxElement]: JsxElement;
    [SyntaxKind.JsxExpression]: JsxExpression;
    [SyntaxKind.JsxFragment]: JsxFragment;
    [SyntaxKind.JsxOpeningElement]: JsxOpeningElement;
    [SyntaxKind.JsxOpeningFragment]: JsxOpeningFragment;
    [SyntaxKind.JsxSelfClosingElement]: JsxSelfClosingElement;
    [SyntaxKind.JsxSpreadAttribute]: JsxSpreadAttribute;
    [SyntaxKind.JsxText]: JsxText;
    [SyntaxKind.LabeledStatement]: LabeledStatement;
    [SyntaxKind.LiteralType]: LiteralTypeNode;
    [SyntaxKind.MetaProperty]: MetaProperty;
    [SyntaxKind.MethodDeclaration]: MethodDeclaration;
    [SyntaxKind.MethodSignature]: MethodSignature;
    [SyntaxKind.ModuleBlock]: ModuleBlock;
    [SyntaxKind.ModuleDeclaration]: NamespaceDeclaration;
    [SyntaxKind.NamedExports]: NamedExports;
    [SyntaxKind.NamedImports]: NamedImports;
    [SyntaxKind.NamespaceImport]: NamespaceImport;
    [SyntaxKind.NewExpression]: NewExpression;
    [SyntaxKind.NonNullExpression]: NonNullExpression;
    [SyntaxKind.NotEmittedStatement]: NotEmittedStatement;
    [SyntaxKind.NoSubstitutionTemplateLiteral]: NoSubstitutionTemplateLiteral;
    [SyntaxKind.LastLiteralToken]: NoSubstitutionTemplateLiteral;
    [SyntaxKind.FirstTemplateToken]: NoSubstitutionTemplateLiteral;
    [SyntaxKind.NumericLiteral]: NumericLiteral;
    [SyntaxKind.FirstLiteralToken]: NumericLiteral;
    [SyntaxKind.ObjectBindingPattern]: ObjectBindingPattern;
    [SyntaxKind.ObjectLiteralExpression]: ObjectLiteralExpression;
    [SyntaxKind.OmittedExpression]: OmittedExpression;
    [SyntaxKind.Parameter]: ParameterDeclaration;
    [SyntaxKind.ParenthesizedExpression]: ParenthesizedExpression;
    [SyntaxKind.ParenthesizedType]: ParenthesizedTypeNode;
    [SyntaxKind.PartiallyEmittedExpression]: PartiallyEmittedExpression;
    [SyntaxKind.PostfixUnaryExpression]: PostfixUnaryExpression;
    [SyntaxKind.PrefixUnaryExpression]: PrefixUnaryExpression;
    [SyntaxKind.PropertyAccessExpression]: PropertyAccessExpression;
    [SyntaxKind.PropertyAssignment]: PropertyAssignment;
    [SyntaxKind.PropertyDeclaration]: PropertyDeclaration;
    [SyntaxKind.PropertySignature]: PropertySignature;
    [SyntaxKind.RegularExpressionLiteral]: RegularExpressionLiteral;
    [SyntaxKind.ReturnStatement]: ReturnStatement;
    [SyntaxKind.SetAccessor]: SetAccessorDeclaration;
    [SyntaxKind.ShorthandPropertyAssignment]: ShorthandPropertyAssignment;
    [SyntaxKind.SpreadAssignment]: SpreadAssignment;
    [SyntaxKind.SpreadElement]: SpreadElement;
    [SyntaxKind.StringLiteral]: StringLiteral;
    [SyntaxKind.SwitchStatement]: SwitchStatement;
    [SyntaxKind.SyntaxList]: SyntaxList;
    [SyntaxKind.TaggedTemplateExpression]: TaggedTemplateExpression;
    [SyntaxKind.TemplateExpression]: TemplateExpression;
    [SyntaxKind.TemplateHead]: TemplateHead;
    [SyntaxKind.TemplateMiddle]: TemplateMiddle;
    [SyntaxKind.TemplateSpan]: TemplateSpan;
    [SyntaxKind.TemplateTail]: TemplateTail;
    [SyntaxKind.LastTemplateToken]: TemplateTail;
    [SyntaxKind.ThisType]: ThisTypeNode;
    [SyntaxKind.ThrowStatement]: ThrowStatement;
    [SyntaxKind.TryStatement]: TryStatement;
    [SyntaxKind.TupleType]: TupleTypeNode;
    [SyntaxKind.TypeAliasDeclaration]: TypeAliasDeclaration;
    [SyntaxKind.TypeAssertionExpression]: TypeAssertion;
    [SyntaxKind.TypeLiteral]: TypeLiteralNode;
    [SyntaxKind.TypeParameter]: TypeParameterDeclaration;
    [SyntaxKind.TypeReference]: TypeReferenceNode;
    [SyntaxKind.UnionType]: UnionTypeNode;
    [SyntaxKind.VariableDeclaration]: VariableDeclaration;
    [SyntaxKind.VariableDeclarationList]: VariableDeclarationList;
    [SyntaxKind.VariableStatement]: VariableStatement;
    [SyntaxKind.JSDocComment]: JSDoc;
    [SyntaxKind.TypePredicate]: TypeNode;
    [SyntaxKind.FirstTypeNode]: TypeNode;
    [SyntaxKind.SemicolonToken]: Node;
    [SyntaxKind.InferKeyword]: Node;
    [SyntaxKind.TypeOfExpression]: TypeOfExpression;
    [SyntaxKind.WhileStatement]: WhileStatement;
    [SyntaxKind.WithStatement]: WithStatement;
    [SyntaxKind.YieldExpression]: YieldExpression;
    [SyntaxKind.AnyKeyword]: Expression;
    [SyntaxKind.BooleanKeyword]: Expression;
    [SyntaxKind.NeverKeyword]: Expression;
    [SyntaxKind.NumberKeyword]: Expression;
    [SyntaxKind.ObjectKeyword]: Expression;
    [SyntaxKind.StringKeyword]: Expression;
    [SyntaxKind.SymbolKeyword]: Expression;
    [SyntaxKind.UndefinedKeyword]: Expression;
    [SyntaxKind.FalseKeyword]: BooleanLiteral;
    [SyntaxKind.TrueKeyword]: BooleanLiteral;
    [SyntaxKind.ImportKeyword]: ImportExpression;
    [SyntaxKind.NullKeyword]: NullLiteral;
    [SyntaxKind.SuperKeyword]: SuperExpression;
    [SyntaxKind.ThisKeyword]: ThisExpression;
    [SyntaxKind.VoidExpression]: VoidExpression;
}

export interface KindToNodeMappings extends ImplementedKindToNodeMappings {
    [kind: number]: Node;
}

export interface KindToExpressionMappings {
    [kind: number]: Node;
    [SyntaxKind.ArrayLiteralExpression]: ArrayLiteralExpression;
    [SyntaxKind.ArrowFunction]: ArrowFunction;
    [SyntaxKind.AsExpression]: AsExpression;
    [SyntaxKind.AwaitExpression]: AwaitExpression;
    [SyntaxKind.BinaryExpression]: BinaryExpression;
    [SyntaxKind.CallExpression]: CallExpression;
    [SyntaxKind.ClassExpression]: ClassExpression;
    [SyntaxKind.CommaListExpression]: CommaListExpression;
    [SyntaxKind.ConditionalExpression]: ConditionalExpression;
    [SyntaxKind.DeleteExpression]: DeleteExpression;
    [SyntaxKind.ElementAccessExpression]: ElementAccessExpression;
    [SyntaxKind.FunctionExpression]: FunctionExpression;
    [SyntaxKind.Identifier]: Identifier;
    [SyntaxKind.JsxClosingFragment]: JsxClosingFragment;
    [SyntaxKind.JsxElement]: JsxElement;
    [SyntaxKind.JsxExpression]: JsxExpression;
    [SyntaxKind.JsxFragment]: JsxFragment;
    [SyntaxKind.JsxOpeningElement]: JsxOpeningElement;
    [SyntaxKind.JsxOpeningFragment]: JsxOpeningFragment;
    [SyntaxKind.JsxSelfClosingElement]: JsxSelfClosingElement;
    [SyntaxKind.MetaProperty]: MetaProperty;
    [SyntaxKind.NewExpression]: NewExpression;
    [SyntaxKind.NonNullExpression]: NonNullExpression;
    [SyntaxKind.NoSubstitutionTemplateLiteral]: NoSubstitutionTemplateLiteral;
    [SyntaxKind.LastLiteralToken]: NoSubstitutionTemplateLiteral;
    [SyntaxKind.FirstTemplateToken]: NoSubstitutionTemplateLiteral;
    [SyntaxKind.NumericLiteral]: NumericLiteral;
    [SyntaxKind.FirstLiteralToken]: NumericLiteral;
    [SyntaxKind.ObjectLiteralExpression]: ObjectLiteralExpression;
    [SyntaxKind.OmittedExpression]: OmittedExpression;
    [SyntaxKind.ParenthesizedExpression]: ParenthesizedExpression;
    [SyntaxKind.PartiallyEmittedExpression]: PartiallyEmittedExpression;
    [SyntaxKind.PostfixUnaryExpression]: PostfixUnaryExpression;
    [SyntaxKind.PrefixUnaryExpression]: PrefixUnaryExpression;
    [SyntaxKind.PropertyAccessExpression]: PropertyAccessExpression;
    [SyntaxKind.RegularExpressionLiteral]: RegularExpressionLiteral;
    [SyntaxKind.SpreadElement]: SpreadElement;
    [SyntaxKind.StringLiteral]: StringLiteral;
    [SyntaxKind.TaggedTemplateExpression]: TaggedTemplateExpression;
    [SyntaxKind.TemplateExpression]: TemplateExpression;
    [SyntaxKind.TypeAssertionExpression]: TypeAssertion;
    [SyntaxKind.TypeOfExpression]: TypeOfExpression;
    [SyntaxKind.YieldExpression]: YieldExpression;
    [SyntaxKind.AnyKeyword]: Expression;
    [SyntaxKind.BooleanKeyword]: Expression;
    [SyntaxKind.NeverKeyword]: Expression;
    [SyntaxKind.NumberKeyword]: Expression;
    [SyntaxKind.ObjectKeyword]: Expression;
    [SyntaxKind.StringKeyword]: Expression;
    [SyntaxKind.SymbolKeyword]: Expression;
    [SyntaxKind.UndefinedKeyword]: Expression;
    [SyntaxKind.FalseKeyword]: BooleanLiteral;
    [SyntaxKind.TrueKeyword]: BooleanLiteral;
    [SyntaxKind.ImportKeyword]: ImportExpression;
    [SyntaxKind.NullKeyword]: NullLiteral;
    [SyntaxKind.SuperKeyword]: SuperExpression;
    [SyntaxKind.ThisKeyword]: ThisExpression;
    [SyntaxKind.VoidExpression]: VoidExpression;
}

declare const BooleanLiteralBase: typeof PrimaryExpression;

export declare class BooleanLiteral extends BooleanLiteralBase<ts.BooleanLiteral> {
    /**
     * Gets the literal value.
     */
    getLiteralValue(): boolean;
    /**
     * Sets the literal value.
     *
     * Note: For the time being, this forgets the current node and returns the new node.
     * @param value - Value to set.
     */
    setLiteralValue(value: boolean): BooleanLiteral;
}

declare const NullLiteralBase: typeof PrimaryExpression;

export declare class NullLiteral extends NullLiteralBase<ts.NullLiteral> {
}

declare const NumericLiteralBase: typeof LiteralExpression;

export declare class NumericLiteral extends NumericLiteralBase<ts.NumericLiteral> {
    /**
     * Gets the literal value.
     */
    getLiteralValue(): number;
    /**
     * Sets the literal value.
     * @param value - Value to set.
     */
    setLiteralValue(value: number): this;
}

/**
 * Quote type for a string literal.
 */
export declare enum QuoteKind {
    /**
     * Single quote
     */
    Single = "'",
    /**
     * Double quote
     */
    Double = "\""
}

declare const RegularExpressionLiteralBase: typeof LiteralExpression;

export declare class RegularExpressionLiteral extends RegularExpressionLiteralBase<ts.RegularExpressionLiteral> {
    /**
     * Gets the literal value.
     */
    getLiteralValue(): RegExp;
    /**
     * Sets the literal value according to a pattern and some flags.
     * @param pattern - Pattern.
     * @param flags - Flags.
     */
    setLiteralValue(pattern: string, flags?: string): this;
    /**
     * Sets the literal value according to a regular expression object.
     * @param regExp - Regular expression.
     */
    setLiteralValue(regExp: RegExp): this;
}

declare const StringLiteralBase: typeof LiteralExpression;

export declare class StringLiteral extends StringLiteralBase<ts.StringLiteral> {
    /**
     * Gets the literal value.
     *
     * This is equivalent to .getLiteralText() for string literals and only exists for consistency with other literals.
     */
    getLiteralValue(): string;
    /**
     * Sets the literal value.
     * @param value - Value to set.
     */
    setLiteralValue(value: string): this;
    /**
     * Gets the quote kind.
     */
    getQuoteKind(): QuoteKind;
}

declare const NoSubstitutionTemplateLiteralBase: typeof LiteralExpression;

export declare class NoSubstitutionTemplateLiteral extends NoSubstitutionTemplateLiteralBase<ts.NoSubstitutionTemplateLiteral> {
    /**
     * Gets the literal value.
     */
    getLiteralValue(): string;
    /**
     * Sets the literal value.
     *
     * Note: This could possibly replace the node if you add a tagged template.
     * @param value - Value to set.
     * @returns The new node if the kind changed; the current node otherwise.
     */
    setLiteralValue(value: string): TemplateLiteral;
}

export declare class TaggedTemplateExpression extends MemberExpression<ts.TaggedTemplateExpression> {
    /**
     * Gets the tag.
     */
    getTag(): LeftHandSideExpression;
    /**
     * Gets the template literal.
     */
    getTemplate(): TemplateLiteral;
    /**
     * Removes the tag from the tagged template.
     * @returns The new template expression.
     */
    removeTag(): TemplateLiteral;
}

declare const TemplateExpressionBase: typeof PrimaryExpression;

export declare class TemplateExpression extends TemplateExpressionBase<ts.TemplateExpression> {
    /**
     * Gets the template head.
     */
    getHead(): TemplateHead;
    /**
     * Gets the template spans.
     */
    getTemplateSpans(): TemplateSpan[];
    /**
     * Sets the literal value.
     *
     * Note: This could possibly replace the node if you remove all the tagged templates.
     * @param value - Value to set.
     * @returns The new node if the kind changed; the current node otherwise.
     */
    setLiteralValue(value: string): TemplateLiteral;
}

declare const TemplateHeadBase: Constructor<LiteralLikeNode> & typeof Node;

export declare class TemplateHead extends TemplateHeadBase<ts.TemplateHead> {
}

declare const TemplateMiddleBase: Constructor<LiteralLikeNode> & typeof Node;

export declare class TemplateMiddle extends TemplateMiddleBase<ts.TemplateMiddle> {
}

declare const TemplateSpanBase: Constructor<ExpressionedNode> & typeof Node;

export declare class TemplateSpan extends TemplateSpanBase<ts.TemplateSpan> {
    /**
     * Gets the template literal.
     */
    getLiteral(): TemplateMiddle | TemplateTail;
}

declare const TemplateTailBase: Constructor<LiteralLikeNode> & typeof Node;

export declare class TemplateTail extends TemplateTailBase<ts.TemplateTail> {
}

declare const ExportAssignmentBase: typeof Statement;

export declare class ExportAssignment extends ExportAssignmentBase<ts.ExportAssignment> {
    /**
     * Gets if this is an export equals assignment.
     *
     * If this is false, then it's `export default`.
     */
    isExportEquals(): boolean;
    /**
     * Sets if this is an export equals assignment or export default.
     * @param value - Whether it should be an export equals assignment.
     */
    setIsExportEquals(value: boolean): this;
    /**
     * Gets the export assignment expression.
     */
    getExpression(): Expression;
    /**
     * Sets the expression of the export assignment.
     * @param textOrWriterFunction - Text or writer function to set as the export assignment expression.
     */
    setExpression(textOrWriterFunction: string | WriterFunction): this;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<ExportAssignmentStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): ExportAssignmentStructure;
}

declare const ExportDeclarationBase: typeof Statement;

export declare class ExportDeclaration extends ExportDeclarationBase<ts.ExportDeclaration> {
    /**
     * Sets the import specifier.
     * @param text - Text to set as the module specifier.
     */
    setModuleSpecifier(text: string): this;
    /**
     * Sets the import specifier.
     * @param sourceFile - Source file to set the module specifier from.
     */
    setModuleSpecifier(sourceFile: SourceFile): this;
    /**
     * Gets the module specifier or undefined if it doesn't exist.
     */
    getModuleSpecifier(): StringLiteral | undefined;
    /**
     * Gets the module specifier value or undefined if it doesn't exist.
     */
    getModuleSpecifierValue(): string | undefined;
    /**
     * Gets the source file referenced in the module specifier or throws if it can't find it or it doesn't exist.
     */
    getModuleSpecifierSourceFileOrThrow(): SourceFile;
    /**
     * Gets the source file referenced in the module specifier.
     */
    getModuleSpecifierSourceFile(): SourceFile | undefined;
    /**
     * Gets if the module specifier starts with `./` or `../`.
     */
    isModuleSpecifierRelative(): boolean;
    /**
     * Removes the module specifier.
     */
    removeModuleSpecifier(): this;
    /**
     * Gets if the module specifier exists
     */
    hasModuleSpecifier(): boolean;
    /**
     * Gets if this export declaration is a namespace export.
     */
    isNamespaceExport(): boolean;
    /**
     * Gets if the export declaration has named exports.
     */
    hasNamedExports(): boolean;
    /**
     * Adds a named export.
     * @param namedExport - Structure, name, or writer function to write the named export.
     */
    addNamedExport(namedExport: OptionalKind<ExportSpecifierStructure> | string | WriterFunction): ExportSpecifier;
    /**
     * Adds named exports.
     * @param namedExports - Structures, names, or writer function to write the named exports.
     */
    addNamedExports(namedExports: ReadonlyArray<OptionalKind<ExportSpecifierStructure> | string | WriterFunction> | WriterFunction): ExportSpecifier[];
    /**
     * Inserts a named export.
     * @param index - Child index to insert at.
     * @param namedExport - Structure, name, or writer function to write the named export.
     */
    insertNamedExport(index: number, namedExport: OptionalKind<ExportSpecifierStructure> | string | WriterFunction): ExportSpecifier;
    /**
     * Inserts named exports into the export declaration.
     * @param index - Child index to insert at.
     * @param namedExports - Structures, names, or writer funciton to write the named exports.
     */
    insertNamedExports(index: number, namedExports: ReadonlyArray<OptionalKind<ExportSpecifierStructure> | string | WriterFunction> | WriterFunction): ExportSpecifier[];
    /**
     * Gets the named exports.
     */
    getNamedExports(): ExportSpecifier[];
    /**
     * Changes the export declaration to namespace export. Removes all the named exports.
     */
    toNamespaceExport(): this;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<ExportDeclarationStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): ExportDeclarationStructure;
}

declare const ExportSpecifierBase: typeof Node;

export declare class ExportSpecifier extends ExportSpecifierBase<ts.ExportSpecifier> {
    /**
     * Sets the name of what's being exported.
     */
    setName(name: string): this;
    /**
     * Gets the name of the export specifier.
     */
    getName(): string;
    /**
     * Gets the name node of what's being exported.
     */
    getNameNode(): Identifier;
    /**
     * Sets the alias for the name being exported and renames all the usages.
     * @param alias - Alias to set.
     */
    renameAlias(alias: string): this;
    /**
     * Sets the alias without renaming all the usages.
     * @param alias - Alias to set.
     */
    setAlias(alias: string): this;
    /**
     * Removes the alias without renaming.
     * @remarks Use removeAliasWithRename() if you want it to rename any usages to the name of the export specifier.
     */
    removeAlias(): this;
    /**
     * Removes the alias and renames any usages to the name of the export specifier.
     */
    removeAliasWithRename(): this;
    /**
     * Gets the alias identifier, if it exists.
     */
    getAliasNode(): Identifier | undefined;
    /**
     * Gets the export declaration associated with this export specifier.
     */
    getExportDeclaration(): ExportDeclaration;
    /**
     * Gets the local target symbol of the export specifier or throws if it doesn't exist.
     */
    getLocalTargetSymbolOrThrow(): Symbol;
    /**
     * Gets the local target symbol of the export specifier or undefined if it doesn't exist.
     */
    getLocalTargetSymbol(): Symbol | undefined;
    /**
     * Gets all the declarations referenced by the export specifier.
     */
    getLocalTargetDeclarations(): LocalTargetDeclarations[];
    /**
     * Removes the export specifier.
     */
    remove(): void;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<ExportSpecifierStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): ExportSpecifierStructure;
}

export declare class ExternalModuleReference extends Node<ts.ExternalModuleReference> {
    /**
     * Gets the expression or undefined of the yield expression.
     */
    getExpression(): Expression | undefined;
    /**
     * Gets the expression of the yield expression or throws if it does not exist.
     */
    getExpressionOrThrow(): Expression<ts.Expression>;
    /**
     * Gets the source file referenced or throws if it can't find it.
     */
    getReferencedSourceFileOrThrow(): SourceFile;
    /**
     * Gets if the external module reference is relative.
     */
    isRelative(): boolean;
    /**
     * Gets the source file referenced or returns undefined if it can't find it.
     */
    getReferencedSourceFile(): SourceFile | undefined;
}

/**
 * Result of refreshing a source file from the file system.
 */
export declare enum FileSystemRefreshResult {
    /**
     * The source file did not change.
     */
    NoChange = 0,
    /**
     * The source file was updated from the file system.
     */
    Updated = 1,
    /**
     * The source file was deleted.
     */
    Deleted = 2
}

declare const ImportClauseBase: typeof Node;

export declare class ImportClause extends ImportClauseBase<ts.ImportClause> {
    /**
     * Gets the default import or throws if it doesn't exit.
     */
    getDefaultImportOrThrow(): Identifier;
    /**
     * Gets the default import or returns undefined if it doesn't exist.
     */
    getDefaultImport(): Identifier | undefined;
    /**
     * Gets the named bindings of the import clause or throws if it doesn't exist.
     */
    getNamedBindingsOrThrow(): NamespaceImport | NamedImports;
    /**
     * Gets the named bindings of the import clause or returns undefined if it doesn't exist.
     */
    getNamedBindings(): NamespaceImport | NamedImports | undefined;
    /**
     * Gets the namespace import if it exists or throws.
     */
    getNamespaceImportOrThrow(): Identifier;
    /**
     * Gets the namespace import identifier, if it exists.
     */
    getNamespaceImport(): Identifier | undefined;
    /**
     * Gets the namespace import identifier, if it exists.
     */
    getNamedImports(): ImportSpecifier[];
}

declare const ImportDeclarationBase: typeof Statement;

export declare class ImportDeclaration extends ImportDeclarationBase<ts.ImportDeclaration> {
    /**
     * Sets the import specifier.
     * @param text - Text to set as the module specifier.
     */
    setModuleSpecifier(text: string): this;
    /**
     * Sets the import specifier.
     * @param sourceFile - Source file to set the module specifier from.
     */
    setModuleSpecifier(sourceFile: SourceFile): this;
    /**
     * Gets the module specifier.
     */
    getModuleSpecifier(): StringLiteral;
    /**
     * Gets the module specifier string literal value.
     */
    getModuleSpecifierValue(): string;
    /**
     * Gets the source file referenced in the module specifier or throws if it can't find it.
     */
    getModuleSpecifierSourceFileOrThrow(): SourceFile;
    /**
     * Gets the source file referenced in the module specifier or returns undefined if it can't find it.
     */
    getModuleSpecifierSourceFile(): SourceFile | undefined;
    /**
     * Gets if the module specifier starts with `./` or `../`.
     */
    isModuleSpecifierRelative(): boolean;
    /**
     * Sets the default import.
     * @param text - Text to set as the default import.
     * @remarks Use renameDefaultImport to rename.
     */
    setDefaultImport(text: string): this;
    /**
     * Renames or sets the provided default import.
     * @param text - Text to set or rename the default import with.
     */
    renameDefaultImport(text: string): this;
    /**
     * Gets the default import or throws if it doesn't exit.
     */
    getDefaultImportOrThrow(): Identifier;
    /**
     * Gets the default import or returns undefined if it doesn't exist.
     */
    getDefaultImport(): Identifier | undefined;
    /**
     * Sets the namespace import.
     * @param text - Text to set as the namespace import.
     * @throws - InvalidOperationError if a named import exists.
     */
    setNamespaceImport(text: string): this;
    /**
     * Removes the namespace import.
     */
    removeNamespaceImport(): this;
    /**
     * Removes the default import.
     */
    removeDefaultImport(): this;
    /**
     * Gets the namespace import if it exists or throws.
     */
    getNamespaceImportOrThrow(): Identifier;
    /**
     * Gets the namespace import identifier, if it exists.
     */
    getNamespaceImport(): Identifier | undefined;
    /**
     * Adds a named import.
     * @param namedImport - Name, structure, or writer to write the named import with.
     */
    addNamedImport(namedImport: OptionalKind<ImportSpecifierStructure> | string | WriterFunction): ImportSpecifier;
    /**
     * Adds named imports.
     * @param namedImport - Structures, names, or writer function to write the named import with.
     */
    addNamedImports(namedImports: ReadonlyArray<OptionalKind<ImportSpecifierStructure> | string | WriterFunction> | WriterFunction): ImportSpecifier[];
    /**
     * Inserts a named import.
     * @param index - Child index to insert at.
     * @param namedImport - Structure, name, or writer function to write the named import with.
     */
    insertNamedImport(index: number, namedImport: OptionalKind<ImportSpecifierStructure> | string | WriterFunction): ImportSpecifier;
    /**
     * Inserts named imports into the import declaration.
     * @param index - Child index to insert at.
     * @param namedImports - Structures, names, or writer function to write the named import with.
     */
    insertNamedImports(index: number, namedImports: ReadonlyArray<OptionalKind<ImportSpecifierStructure> | string | WriterFunction> | WriterFunction): ImportSpecifier[];
    /**
     * Gets the named imports.
     */
    getNamedImports(): ImportSpecifier[];
    /**
     * Removes all the named imports.
     */
    removeNamedImports(): this;
    /**
     * Gets the import clause or throws if it doesn't exist.
     */
    getImportClauseOrThrow(): ImportClause;
    /**
     * Gets the import clause or returns undefined if it doesn't exist.
     */
    getImportClause(): ImportClause | undefined;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<ImportDeclarationStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): ImportDeclarationStructure;
}

declare const ImportEqualsDeclarationBase: Constructor<JSDocableNode> & Constructor<NamedNode> & typeof Statement;

export declare class ImportEqualsDeclaration extends ImportEqualsDeclarationBase<ts.ImportEqualsDeclaration> {
    /**
     * Gets the module reference of the import equals declaration.
     */
    getModuleReference(): ModuleReference;
    /**
     * Gets if the external module reference is relative.
     */
    isExternalModuleReferenceRelative(): boolean;
    /**
     * Sets the external module reference.
     * @param externalModuleReference - External module reference as a string.
     */
    setExternalModuleReference(externalModuleReference: string): this;
    /**
     * Sets the external module reference.
     * @param sourceFile - Source file to set the external module reference to.
     */
    setExternalModuleReference(sourceFile: SourceFile): this;
    /**
     * Gets the source file referenced in the external module reference or throws if it doesn't exist.
     */
    getExternalModuleReferenceSourceFileOrThrow(): SourceFile;
    /**
     * Gets the source file referenced in the external module reference or returns undefined if it doesn't exist.
     */
    getExternalModuleReferenceSourceFile(): SourceFile | undefined;
}

declare const ImportSpecifierBase: typeof Node;

export declare class ImportSpecifier extends ImportSpecifierBase<ts.ImportSpecifier> {
    /**
     * Sets the identifier being imported.
     * @param name - Name being imported.
     */
    setName(name: string): this;
    /**
     * Gets the name of the import specifier.
     */
    getName(): string;
    /**
     * Gets the name node of what's being imported.
     */
    getNameNode(): Identifier;
    /**
     * Sets the alias for the name being imported and renames all the usages.
     * @param alias - Alias to set.
     */
    renameAlias(alias: string): this;
    /**
     * Sets the alias without renaming all the usages.
     * @param alias - Alias to set.
     */
    setAlias(alias: string): this;
    /**
     * Removes the alias without renaming.
     * @remarks Use removeAliasWithRename() if you want it to rename any usages to the name of the import specifier.
     */
    removeAlias(): this;
    /**
     * Removes the alias and renames any usages to the name of the import specifier.
     */
    removeAliasWithRename(): this;
    /**
     * Gets the alias identifier, if it exists.
     */
    getAliasNode(): Identifier | undefined;
    /**
     * Gets the import declaration associated with this import specifier.
     */
    getImportDeclaration(): ImportDeclaration;
    /**
     * Remove the import specifier.
     */
    remove(): void;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<ImportSpecifierStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): ImportSpecifierStructure;
}

declare const ModuleBlockBase: Constructor<StatementedNode> & typeof Statement;

export declare class ModuleBlock extends ModuleBlockBase<ts.ModuleBlock> {
}

declare const NamedExportsBase: typeof Node;

export declare class NamedExports extends NamedExportsBase<ts.NamedExports> {
    /**
     * Gets the export specifiers.
     */
    getElements(): ExportSpecifier[];
}

declare const NamedImportsBase: typeof Node;

export declare class NamedImports extends NamedImportsBase<ts.NamedImports> {
    /**
     * Gets the import specifiers.
     */
    getElements(): ImportSpecifier[];
}

export declare function NamespaceChildableNode<T extends Constructor<NamespaceChildableNodeExtensionType>>(Base: T): Constructor<NamespaceChildableNode> & T;

export interface NamespaceChildableNode {
    /**
     * Gets the parent namespace or undefined if it doesn't exist.
     */
    getParentNamespace(): NamespaceDeclaration | undefined;
    /**
     * Gets the parent namespace or throws if it doesn't exist.
     */
    getParentNamespaceOrThrow(): NamespaceDeclaration;
}

declare type NamespaceChildableNodeExtensionType = Node;
declare const NamespaceDeclarationBase: Constructor<ModuledNode> & Constructor<UnwrappableNode> & Constructor<TextInsertableNode> & Constructor<BodiedNode> & Constructor<NamespaceChildableNode> & Constructor<StatementedNode> & Constructor<JSDocableNode> & Constructor<AmbientableNode> & Constructor<ExportableNode> & Constructor<ModifierableNode> & Constructor<NamedNode> & typeof Statement;

export declare class NamespaceDeclaration extends NamespaceDeclarationBase<ts.NamespaceDeclaration> {
    /**
     * Gets the full name of the namespace.
     */
    getName(): string;
    /**
     * Sets the name without renaming references.
     * @param newName - New full namespace name.
     */
    setName(newName: string): this;
    /**
     * Renames the name.
     * @param newName - New name.
     */
    rename(newName: string): this;
    /**
     * Gets the name nodes.
     */
    getNameNodes(): Identifier[];
    /**
     * Gets if this namespace has a namespace keyword.
     */
    hasNamespaceKeyword(): boolean;
    /**
     * Gets if this namespace has a namespace keyword.
     */
    hasModuleKeyword(): boolean;
    /**
     * Sets the namespace declaration kind.
     * @param kind - Kind to set.
     */
    setDeclarationKind(kind: NamespaceDeclarationKind): this;
    /**
     * Gets the namesapce declaration kind.
     */
    getDeclarationKind(): NamespaceDeclarationKind;
    /**
     * Gets the namespace or module keyword or returns undefined if it's global.
     */
    getDeclarationKindKeyword(): Node<ts.Node> | undefined;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<NamespaceDeclarationStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): NamespaceDeclarationStructure;
}

export declare enum NamespaceDeclarationKind {
    Namespace = "namespace",
    Module = "module",
    Global = "global"
}

declare const NamespaceImportBase: Constructor<RenameableNode> & typeof Node;

export declare class NamespaceImport extends NamespaceImportBase<ts.NamespaceImport> {
    /**
     * Sets the name of the namespace import.
     */
    setName(name: string): this;
    /**
     * Gets the name of the namespace import.
     */
    getName(): string;
    /**
     * Gets the namespace import's name node.
     */
    getNameNode(): Identifier;
}

export declare class FileReference extends TextRange<ts.FileReference> {
    constructor(compilerObject: ts.FileReference, sourceFile: SourceFile);
    /**
     * Gets the referenced file name.
     */
    getFileName(): string;
}

export interface SourceFileCopyOptions {
    overwrite?: boolean;
}

export interface SourceFileMoveOptions {
    overwrite?: boolean;
}

/**
 * Options for emitting a source file.
 */
export interface SourceFileEmitOptions extends EmitOptionsBase {
}

declare const SourceFileBase: Constructor<ModuledNode> & Constructor<StatementedNode> & Constructor<TextInsertableNode> & typeof Node;

export declare class SourceFile extends SourceFileBase<ts.SourceFile> {
    private _refreshFromFileSystemInternal;
    private constructor();
    /**
     * Gets the file path.
     */
    getFilePath(): string;
    /**
     * Gets the file path's base name.
     */
    getBaseName(): string;
    /**
     * Gets the file path's base name without the extension.
     */
    getBaseNameWithoutExtension(): string;
    /**
     * Gets the file path's extension.
     */
    getExtension(): string;
    /**
     * Gets the directory that the source file is contained in.
     */
    getDirectory(): Directory;
    /**
     * Gets the directory path that the source file is contained in.
     */
    getDirectoryPath(): string;
    /**
     * Gets the full text with leading trivia.
     */
    getFullText(): string;
    /**
     * Gets the line and column number at the provided position (1-indexed).
     * @param pos - Position in the source file.
     */
    getLineAndColumnAtPos(pos: number): {
            line: number;
            column: number;
        };
    /**
     * Gets the character count from the start of the line to the provided position.
     * @param pos - Position.
     */
    getLengthFromLineStartAtPos(pos: number): number;
    /**
     * Copies this source file to the specified directory.
     *
     * This will modify the module specifiers in the new file, if necessary.
     * @param dirPathOrDirectory Directory path or directory object to copy the file to.
     * @param options Options for copying.
     * @returns The source file the copy was made to.
     */
    copyToDirectory(dirPathOrDirectory: string | Directory, options?: SourceFileCopyOptions): SourceFile;
    /**
     * Copy this source file to a new file.
     *
     * This will modify the module specifiers in the new file, if necessary.
     * @param filePath - New file path. Can be relative to the original file or an absolute path.
     * @param options - Options for copying.
     */
    copy(filePath: string, options?: SourceFileCopyOptions): SourceFile;
    /**
     * Copy this source file to a new file and immediately saves it to the file system asynchronously.
     *
     * This will modify the module specifiers in the new file, if necessary.
     * @param filePath - New file path. Can be relative to the original file or an absolute path.
     * @param options - Options for copying.
     */
    copyImmediately(filePath: string, options?: SourceFileCopyOptions): Promise<SourceFile>;
    /**
     * Copy this source file to a new file and immediately saves it to the file system synchronously.
     *
     * This will modify the module specifiers in the new file, if necessary.
     * @param filePath - New file path. Can be relative to the original file or an absolute path.
     * @param options - Options for copying.
     */
    copyImmediatelySync(filePath: string, options?: SourceFileCopyOptions): SourceFile;
    /**
     * Moves this source file to the specified directory.
     *
     * This will modify the module specifiers in other files that specify this file and the module specifiers in the current file, if necessary.
     * @param dirPathOrDirectory Directory path or directory object to move the file to.
     * @param options Options for moving.
     */
    moveToDirectory(dirPathOrDirectory: string | Directory, options?: SourceFileMoveOptions): SourceFile;
    /**
     * Moves this source file to a new file.
     *
     * This will modify the module specifiers in other files that specify this file and the module specifiers in the current file, if necessary.
     * @param filePath - New file path. Can be relative to the original file or an absolute path.
     * @param options - Options for moving.
     */
    move(filePath: string, options?: SourceFileMoveOptions): SourceFile;
    /**
     * Moves this source file to a new file and asynchronously updates the file system immediately.
     *
     * This will modify the module specifiers in other files that specify this file and the module specifiers in the current file, if necessary.
     * @param filePath - New file path. Can be relative to the original file or an absolute path.
     * @param options - Options for moving.
     */
    moveImmediately(filePath: string, options?: SourceFileMoveOptions): Promise<SourceFile>;
    /**
     * Moves this source file to a new file and synchronously updates the file system immediately.
     *
     * This will modify the module specifiers in other files that specify this file and the module specifiers in the current file, if necessary.
     * @param filePath - New file path. Can be relative to the original file or an absolute path.
     * @param options - Options for moving.
     */
    moveImmediatelySync(filePath: string, options?: SourceFileMoveOptions): SourceFile;
    /**
     * Queues a deletion of the file to the file system.
     *
     * The file will be deleted when you call ast.save(). If you wish to immediately delete the file, then use deleteImmediately().
     */
    delete(): void;
    /**
     * Asynchronously deletes the file from the file system.
     */
    deleteImmediately(): Promise<void>;
    /**
     * Synchronously deletes the file from the file system.
     */
    deleteImmediatelySync(): void;
    /**
     * Asynchronously saves this file with any changes.
     */
    save(): Promise<void>;
    /**
     * Synchronously saves this file with any changes.
     */
    saveSync(): void;
    /**
     * Gets any `/// <reference path="..." />` comments.
     */
    getReferencedFiles(): FileReference[];
    /**
     * Gets any `/// <reference types="..." />` comments.
     */
    getTypeReferenceDirectives(): FileReference[];
    /**
     * Gets any `/// <reference lib="..." />` comments.
     */
    getLibReferenceDirectives(): FileReference[];
    /**
     * Get any source files that reference this source file.
     */
    getReferencingSourceFiles(): SourceFile[];
    /**
     * Gets the import and exports in other source files that reference this source file.
     */
    getReferencingNodesInOtherSourceFiles(): SourceFileReferencingNodes[];
    /**
     * Gets the string literals in other source files that reference this source file.
     */
    getReferencingLiteralsInOtherSourceFiles(): StringLiteral[];
    /**
     * Gets all the descendant string literals that reference a source file.
     */
    getImportStringLiterals(): StringLiteral[];
    /**
     * Gets the script target of the source file.
     */
    getLanguageVersion(): ScriptTarget;
    /**
     * Gets the language variant of the source file.
     */
    getLanguageVariant(): LanguageVariant;
    /**
     * Gets the script kind of the source file.
     */
    getScriptKind(): ScriptKind;
    /**
     * Gets if this is a declaration file.
     */
    isDeclarationFile(): boolean;
    /**
     * Gets if the source file was discovered while loading an external library.
     */
    isFromExternalLibrary(): boolean;
    /**
     * Gets if the source file is a descendant of a node_modules directory.
     */
    isInNodeModules(): boolean;
    /**
     * Gets if this source file has been saved or if the latest changes have been saved.
     */
    isSaved(): boolean;
    /**
     * Gets the pre-emit diagnostics of the specified source file.
     */
    getPreEmitDiagnostics(): Diagnostic[];
    /**
     * Deindents the line at the specified position.
     * @param pos - Position.
     * @param times - Times to unindent. Specify a negative value to indent.
     */
    unindent(pos: number, times?: number): this;
    /**
     * Deindents the lines within the specified range.
     * @param positionRange - Position range.
     * @param times - Times to unindent. Specify a negative value to indent.
     */
    unindent(positionRange: [number, number], times?: number): this;
    /**
     * Indents the line at the specified position.
     * @param pos - Position.
     * @param times - Times to indent. Specify a negative value to unindent.
     */
    indent(pos: number, times?: number): this;
    /**
     * Indents the lines within the specified range.
     * @param positionRange - Position range.
     * @param times - Times to indent. Specify a negative value to unindent.
     */
    indent(positionRange: [number, number], times?: number): this;
    /**
     * Asynchronously emits the source file as a JavaScript file.
     */
    emit(options?: SourceFileEmitOptions): Promise<EmitResult>;
    /**
     * Synchronously emits the source file as a JavaScript file.
     */
    emitSync(options?: SourceFileEmitOptions): EmitResult;
    /**
     * Gets the emit output of this source file.
     * @param options - Emit options.
     */
    getEmitOutput(options?: {
            emitOnlyDtsFiles?: boolean;
        }): EmitOutput;
    /**
     * Formats the source file text using the internal TypeScript formatting API.
     * @param settings - Format code settings.
     */
    formatText(settings?: FormatCodeSettings): void;
    /**
     * Refresh the source file from the file system.
     *
     * WARNING: When updating from the file system, this will "forget" any previously navigated nodes.
     * @returns What action ended up taking place.
     */
    refreshFromFileSystem(): Promise<FileSystemRefreshResult>;
    /**
     * Synchronously refreshes the source file from the file system.
     *
     * WARNING: When updating from the file system, this will "forget" any previously navigated nodes.
     * @returns What action ended up taking place.
     */
    refreshFromFileSystemSync(): FileSystemRefreshResult;
    /**
     * Gets the relative path to another source file.
     * @param sourceFile - Source file.
     */
    getRelativePathTo(sourceFile: SourceFile): string;
    /**
     * Gets the relative path to another directory.
     * @param directory - Directory.
     */
    getRelativePathTo(directory: Directory): string;
    /**
     * Gets the relative path to the specified source file as a module specifier.
     * @param sourceFile - Source file.
     */
    getRelativePathAsModuleSpecifierTo(sourceFile: SourceFile): string;
    /**
     * Gets the relative path to the specified directory as a module specifier.
     * @param directory - Directory.
     */
    getRelativePathAsModuleSpecifierTo(directory: Directory): string;
    /**
     * Subscribe to when the source file is modified.
     * @param subscription - Subscription.
     * @param subscribe - Optional and defaults to true. Use an explicit false to unsubscribe.
     */
    onModified(subscription: (sender: SourceFile) => void, subscribe?: boolean): this;
    /**
     * Organizes the imports in the file.
     *
     * WARNING! This will forget all the nodes in the file! It's best to do this after you're all done with the file.
     * @param formatSettings - Format code settings.
     * @param userPreferences - User preferences for refactoring.
     */
    organizeImports(formatSettings?: FormatCodeSettings, userPreferences?: UserPreferences): this;
    /**
     * Removes all unused declarations like interfaces, classes, enums, functions, variables, parameters,
     * methods, properties, imports, etc. from this file.
     *
     * Tip: For optimal results, sometimes this method needs to be called more than once. There could be nodes
     * that are only referenced in unused declarations and in this case, another call will also remove them.
     *
     * WARNING! This will forget all the nodes in the file! It's best to do this after you're all done with the file.
     * @param formatSettings - Format code settings.
     * @param userPreferences - User preferences for refactoring.
     */
    fixUnusedIdentifiers(formatSettings?: FormatCodeSettings, userPreferences?: UserPreferences): this;
    /**
     * Code fix to add import declarations for identifiers that are referenced, but not imported in the source file.
     * @param formatSettings - Format code settings.
     * @param userPreferences - User preferences for refactoring.
     */
    fixMissingImports(formatSettings?: FormatCodeSettings, userPreferences?: UserPreferences): this;
    /**
     * Applies the text changes to the source file.
     *
     * WARNING! This will forget all the nodes in the file! It's best to do this after you're all done with the file.
     * @param textChanges - Text changes.
     */
    applyTextChanges(textChanges: ReadonlyArray<TextChange>): this;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<SourceFileStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): SourceFileStructure;
}

declare const BlockBase: Constructor<TextInsertableNode> & Constructor<StatementedNode> & typeof Statement;

export declare class Block extends BlockBase<ts.Block> {
}

export declare class BreakStatement extends Statement<ts.BreakStatement> {
    /**
     * Gets this break statement's label or undefined if it does not exist.
     */
    getLabel(): Identifier | undefined;
    /**
     * Gets this break statement's label or throw if it does not exist.
     */
    getLabelOrThrow(): Identifier;
}

declare const CaseBlockBase: Constructor<TextInsertableNode> & typeof Node;

export declare class CaseBlock extends CaseBlockBase<ts.CaseBlock> {
    /**
     * Gets the clauses.
     */
    getClauses(): CaseOrDefaultClause[];
    /**
     * Removes the clause at the specified index.
     * @param index - Index.
     */
    removeClause(index: number): this;
    /**
     * Removes the clauses in the specified range.
     * @param indexRange - Index range.
     */
    removeClauses(indexRange: [number, number]): this;
}

declare const CaseClauseBase: Constructor<TextInsertableNode> & Constructor<StatementedNode> & typeof Node;

export declare class CaseClause extends CaseClauseBase<ts.CaseClause> {
    /**
     * Gets this switch statement's expression.
     */
    getExpression(): Expression;
    /**
     * Removes this case clause.
     */
    remove(): void;
}

declare const CatchClauseBase: typeof Node;

export declare class CatchClause extends CatchClauseBase<ts.CatchClause> {
    /**
     * Gets this catch clause's block.
     */
    getBlock(): Block;
    /**
     * Gets this catch clause's variable declaration or undefined if none exists.
     */
    getVariableDeclaration(): VariableDeclaration | undefined;
    /**
     * Gets this catch clause's variable declaration or throws if none exists.
     */
    getVariableDeclarationOrThrow(): VariableDeclaration;
}

export declare class CommentStatement extends Statement<CompilerCommentStatement> {
}

export declare class ContinueStatement extends Statement<ts.ContinueStatement> {
    /**
     * Gets this continue statement's label or undefined if it does not exist.
     */
    getLabel(): Identifier | undefined;
    /**
     * Gets this continue statement's label or throw if it does not exist.
     */
    getLabelOrThrow(): Identifier;
}

declare const DebuggerStatementBase: typeof Statement;

export declare class DebuggerStatement extends DebuggerStatementBase<ts.DebuggerStatement> {
}

declare const DefaultClauseBase: Constructor<TextInsertableNode> & Constructor<StatementedNode> & typeof Node;

export declare class DefaultClause extends DefaultClauseBase<ts.DefaultClause> {
    /**
     * Removes the default clause.
     */
    remove(): void;
}

declare const DoStatementBase: typeof IterationStatement;

export declare class DoStatement extends DoStatementBase<ts.DoStatement> {
    /**
     * Gets this do statement's expression.
     */
    getExpression(): Expression;
}

declare const EmptyStatementBase: typeof Statement;

export declare class EmptyStatement extends EmptyStatementBase<ts.EmptyStatement> {
}

declare const ExpressionStatementBase: Constructor<JSDocableNode> & typeof Statement;

export declare class ExpressionStatement extends ExpressionStatementBase<ts.ExpressionStatement> {
    /**
     * Gets this expression statement's expression.
     */
    getExpression(): Expression;
}

declare const ForInStatementBase: typeof IterationStatement;

export declare class ForInStatement extends ForInStatementBase<ts.ForInStatement> {
    /**
     * Gets this for in statement's initializer.
     */
    getInitializer(): VariableDeclarationList | Expression;
    /**
     * Gets this for in statement's expression.
     */
    getExpression(): Expression;
}

declare const ForOfStatementBase: Constructor<AwaitableNode> & typeof IterationStatement;

export declare class ForOfStatement extends ForOfStatementBase<ts.ForOfStatement> {
    /**
     * Gets this for of statement's initializer.
     */
    getInitializer(): VariableDeclarationList | Expression;
    /**
     * Gets this for of statement's expression.
     */
    getExpression(): Expression;
}

declare const ForStatementBase: typeof IterationStatement;

export declare class ForStatement extends ForStatementBase<ts.ForStatement> {
    /**
     * Gets this for statement's initializer or undefined if none exists.
     */
    getInitializer(): VariableDeclarationList | Expression | undefined;
    /**
     * Gets this for statement's initializer or throws if none exists.
     */
    getInitializerOrThrow(): Expression<ts.Expression> | VariableDeclarationList;
    /**
     * Gets this for statement's condition or undefined if none exists.
     */
    getCondition(): Expression | undefined;
    /**
     * Gets this for statement's condition or throws if none exists.
     */
    getConditionOrThrow(): Expression<ts.Expression>;
    /**
     * Gets this for statement's incrementor.
     */
    getIncrementor(): Expression | undefined;
    /**
     * Gets this for statement's incrementor or throws if none exists.
     */
    getIncrementorOrThrow(): Expression<ts.Expression>;
}

export declare class IfStatement extends Statement<ts.IfStatement> {
    /**
     * Gets this if statement's expression.
     */
    getExpression(): Expression;
    /**
     * Gets this if statement's then statement.
     */
    getThenStatement(): Statement;
    /**
     * Gets this if statement's else statement.
     */
    getElseStatement(): Statement | undefined;
}

export declare class IterationStatement<T extends ts.IterationStatement = ts.IterationStatement> extends Statement<T> {
    /**
     * Gets this iteration statement's statement.
     */
    getStatement(): Statement;
}

declare const LabeledStatementBase: Constructor<JSDocableNode> & typeof Statement;

export declare class LabeledStatement extends LabeledStatementBase<ts.LabeledStatement> {
    /**
     * Gets this labeled statement's label
     */
    getLabel(): Identifier;
    /**
     * Gets this labeled statement's statement
     */
    getStatement(): Statement;
}

declare const NotEmittedStatementBase: typeof Statement;

export declare class NotEmittedStatement extends NotEmittedStatementBase<ts.NotEmittedStatement> {
}

export declare class ReturnStatement extends Statement<ts.ReturnStatement> {
    /**
     * Gets this return statement's expression if it exists or throws.
     */
    getExpressionOrThrow(): Expression<ts.Expression>;
    /**
     * Gets this return statement's expression if it exists.
     */
    getExpression(): Expression | undefined;
}

declare const StatementBase: Constructor<ChildOrderableNode> & typeof Node;

export declare class Statement<T extends ts.Statement = ts.Statement> extends StatementBase<T> {
    /**
     * Removes the statement.
     */
    remove(): void;
}

export declare function StatementedNode<T extends Constructor<StatementedNodeExtensionType>>(Base: T): Constructor<StatementedNode> & T;

export interface StatementedNode {
    /**
     * Gets the node's statements.
     */
    getStatements(): Statement[];
    /**
     * Gets the node's statements with comment statements.
     */
    getStatementsWithComments(): Statement[];
    /**
     * Gets the first statement that matches the provided condition or returns undefined if it doesn't exist.
     * @param findFunction - Function to find the statement by.
     */
    getStatement<T extends Statement>(findFunction: (statement: Statement) => statement is T): T | undefined;
    /**
     * Gets the first statement that matches the provided condition or returns undefined if it doesn't exist.
     * @param findFunction - Function to find the statement by.
     */
    getStatement(findFunction: (statement: Statement) => boolean): Statement | undefined;
    /**
     * Gets the first statement that matches the provided condition or throws if it doesn't exist.
     * @param findFunction - Function to find the statement by.
     */
    getStatementOrThrow<T extends Statement>(findFunction: (statement: Statement) => statement is T): T;
    /**
     * Gets the first statement that matches the provided condition or throws if it doesn't exist.
     * @param findFunction - Function to find the statement by.
     */
    getStatementOrThrow(findFunction: (statement: Statement) => boolean): Statement;
    /**
     * Gets the first statement that matches the provided syntax kind or returns undefined if it doesn't exist.
     * @param kind - Syntax kind to find the node by.
     */
    getStatementByKind<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappingsWithCommentStatements[TKind] | undefined;
    /**
     * Gets the first statement that matches the provided syntax kind or throws if it doesn't exist.
     * @param kind - Syntax kind to find the node by.
     */
    getStatementByKindOrThrow<TKind extends SyntaxKind>(kind: TKind): KindToNodeMappingsWithCommentStatements[TKind];
    /**
     * Add statements.
     * @param statements - statements to add.
     * @returns The statements that were added.
     */
    addStatements(statements: string | WriterFunction | ReadonlyArray<string | WriterFunction | StatementStructures>): Statement[];
    /**
     * Inserts statements at the specified index.
     * @param index - Child index to insert at.
     * @param statements - Statements to insert.
     * @returns The statements that were inserted.
     */
    insertStatements(index: number, statements: string | WriterFunction | ReadonlyArray<string | WriterFunction | StatementStructures>): Statement[];
    /**
     * Removes the statement at the specified index.
     * @param index - Child index to remove the statement at.
     */
    removeStatement(index: number): this;
    /**
     * Removes the statements at the specified index range.
     * @param indexRange - The start and end inclusive index range to remove.
     */
    removeStatements(indexRange: [number, number]): this;
    /**
     * Adds an class declaration as a child.
     * @param structure - Structure of the class declaration to add.
     */
    addClass(structure: OptionalKind<ClassDeclarationStructure>): ClassDeclaration;
    /**
     * Adds class declarations as a child.
     * @param structures - Structures of the class declarations to add.
     */
    addClasses(structures: ReadonlyArray<OptionalKind<ClassDeclarationStructure>>): ClassDeclaration[];
    /**
     * Inserts an class declaration as a child.
     * @param index - Child index to insert at.
     * @param structure - Structure of the class declaration to insert.
     */
    insertClass(index: number, structure: OptionalKind<ClassDeclarationStructure>): ClassDeclaration;
    /**
     * Inserts class declarations as a child.
     * @param index - Child index to insert at.
     * @param structures - Structures of the class declarations to insert.
     */
    insertClasses(index: number, structures: ReadonlyArray<OptionalKind<ClassDeclarationStructure>>): ClassDeclaration[];
    /**
     * Gets the direct class declaration children.
     */
    getClasses(): ClassDeclaration[];
    /**
     * Gets a class.
     * @param name - Name of the class.
     */
    getClass(name: string): ClassDeclaration | undefined;
    /**
     * Gets a class.
     * @param findFunction - Function to use to find the class.
     */
    getClass(findFunction: (declaration: ClassDeclaration) => boolean): ClassDeclaration | undefined;
    /**
     * Gets a class or throws if it doesn't exist.
     * @param name - Name of the class.
     */
    getClassOrThrow(name: string): ClassDeclaration;
    /**
     * Gets a class or throws if it doesn't exist.
     * @param findFunction - Function to use to find the class.
     */
    getClassOrThrow(findFunction: (declaration: ClassDeclaration) => boolean): ClassDeclaration;
    /**
     * Adds an enum declaration as a child.
     * @param structure - Structure of the enum declaration to add.
     */
    addEnum(structure: OptionalKind<EnumDeclarationStructure>): EnumDeclaration;
    /**
     * Adds enum declarations as a child.
     * @param structures - Structures of the enum declarations to add.
     */
    addEnums(structures: ReadonlyArray<OptionalKind<EnumDeclarationStructure>>): EnumDeclaration[];
    /**
     * Inserts an enum declaration as a child.
     * @param index - Child index to insert at.
     * @param structure - Structure of the enum declaration to insert.
     */
    insertEnum(index: number, structure: OptionalKind<EnumDeclarationStructure>): EnumDeclaration;
    /**
     * Inserts enum declarations as a child.
     * @param index - Child index to insert at.
     * @param structures - Structures of the enum declarations to insert.
     */
    insertEnums(index: number, structures: ReadonlyArray<OptionalKind<EnumDeclarationStructure>>): EnumDeclaration[];
    /**
     * Gets the direct enum declaration children.
     */
    getEnums(): EnumDeclaration[];
    /**
     * Gets an enum.
     * @param name - Name of the enum.
     */
    getEnum(name: string): EnumDeclaration | undefined;
    /**
     * Gets an enum.
     * @param findFunction - Function to use to find the enum.
     */
    getEnum(findFunction: (declaration: EnumDeclaration) => boolean): EnumDeclaration | undefined;
    /**
     * Gets an enum or throws if it doesn't exist.
     * @param name - Name of the enum.
     */
    getEnumOrThrow(name: string): EnumDeclaration;
    /**
     * Gets an enum or throws if it doesn't exist.
     * @param findFunction - Function to use to find the enum.
     */
    getEnumOrThrow(findFunction: (declaration: EnumDeclaration) => boolean): EnumDeclaration;
    /**
     * Adds a function declaration as a child.
     * @param structure - Structure of the function declaration to add.
     */
    addFunction(structure: OptionalKind<FunctionDeclarationStructure>): FunctionDeclaration;
    /**
     * Adds function declarations as a child.
     * @param structures - Structures of the function declarations to add.
     */
    addFunctions(structures: ReadonlyArray<OptionalKind<FunctionDeclarationStructure>>): FunctionDeclaration[];
    /**
     * Inserts an function declaration as a child.
     * @param index - Child index to insert at.
     * @param structure - Structure of the function declaration to insert.
     */
    insertFunction(index: number, structure: OptionalKind<FunctionDeclarationStructure>): FunctionDeclaration;
    /**
     * Inserts function declarations as a child.
     * @param index - Child index to insert at.
     * @param structures - Structures of the function declarations to insert.
     */
    insertFunctions(index: number, structures: ReadonlyArray<OptionalKind<FunctionDeclarationStructure>>): FunctionDeclaration[];
    /**
     * Gets the direct function declaration children.
     */
    getFunctions(): FunctionDeclaration[];
    /**
     * Gets a function.
     * @param name - Name of the function.
     */
    getFunction(name: string): FunctionDeclaration | undefined;
    /**
     * Gets a function.
     * @param findFunction - Function to use to find the function.
     */
    getFunction(findFunction: (declaration: FunctionDeclaration) => boolean): FunctionDeclaration | undefined;
    /**
     * Gets a function or throws if it doesn't exist.
     * @param name - Name of the function.
     */
    getFunctionOrThrow(name: string): FunctionDeclaration;
    /**
     * Gets a function or throws if it doesn't exist.
     * @param findFunction - Function to use to find the function.
     */
    getFunctionOrThrow(findFunction: (declaration: FunctionDeclaration) => boolean): FunctionDeclaration;
    /**
     * Adds a interface declaration as a child.
     * @param structure - Structure of the interface declaration to add.
     */
    addInterface(structure: OptionalKind<InterfaceDeclarationStructure>): InterfaceDeclaration;
    /**
     * Adds interface declarations as a child.
     * @param structures - Structures of the interface declarations to add.
     */
    addInterfaces(structures: ReadonlyArray<OptionalKind<InterfaceDeclarationStructure>>): InterfaceDeclaration[];
    /**
     * Inserts an interface declaration as a child.
     * @param index - Child index to insert at.
     * @param structure - Structure of the interface declaration to insert.
     */
    insertInterface(index: number, structure: OptionalKind<InterfaceDeclarationStructure>): InterfaceDeclaration;
    /**
     * Inserts interface declarations as a child.
     * @param index - Child index to insert at.
     * @param structures - Structures of the interface declarations to insert.
     */
    insertInterfaces(index: number, structures: ReadonlyArray<OptionalKind<InterfaceDeclarationStructure>>): InterfaceDeclaration[];
    /**
     * Gets the direct interface declaration children.
     */
    getInterfaces(): InterfaceDeclaration[];
    /**
     * Gets an interface.
     * @param name - Name of the interface.
     */
    getInterface(name: string): InterfaceDeclaration | undefined;
    /**
     * Gets an interface.
     * @param findFunction - Function to use to find the interface.
     */
    getInterface(findFunction: (declaration: InterfaceDeclaration) => boolean): InterfaceDeclaration | undefined;
    /**
     * Gets an interface or throws if it doesn't exist.
     * @param name - Name of the interface.
     */
    getInterfaceOrThrow(name: string): InterfaceDeclaration;
    /**
     * Gets an interface or throws if it doesn't exist.
     * @param findFunction - Function to use to find the interface.
     */
    getInterfaceOrThrow(findFunction: (declaration: InterfaceDeclaration) => boolean): InterfaceDeclaration;
    /**
     * Adds a namespace declaration as a child.
     * @param structure - Structure of the namespace declaration to add.
     */
    addNamespace(structure: OptionalKind<NamespaceDeclarationStructure>): NamespaceDeclaration;
    /**
     * Adds namespace declarations as a child.
     * @param structures - Structures of the namespace declarations to add.
     */
    addNamespaces(structures: ReadonlyArray<OptionalKind<NamespaceDeclarationStructure>>): NamespaceDeclaration[];
    /**
     * Inserts an namespace declaration as a child.
     * @param index - Child index to insert at.
     * @param structure - Structure of the namespace declaration to insert.
     */
    insertNamespace(index: number, structure: OptionalKind<NamespaceDeclarationStructure>): NamespaceDeclaration;
    /**
     * Inserts namespace declarations as a child.
     * @param index - Child index to insert at.
     * @param structures - Structures of the namespace declarations to insert.
     */
    insertNamespaces(index: number, structures: ReadonlyArray<OptionalKind<NamespaceDeclarationStructure>>): NamespaceDeclaration[];
    /**
     * Gets the direct namespace declaration children.
     */
    getNamespaces(): NamespaceDeclaration[];
    /**
     * Gets a namespace.
     * @param name - Name of the namespace.
     */
    getNamespace(name: string): NamespaceDeclaration | undefined;
    /**
     * Gets a namespace.
     * @param findFunction - Function to use to find the namespace.
     */
    getNamespace(findFunction: (declaration: NamespaceDeclaration) => boolean): NamespaceDeclaration | undefined;
    /**
     * Gets a namespace or throws if it doesn't exist.
     * @param name - Name of the namespace.
     */
    getNamespaceOrThrow(name: string): NamespaceDeclaration;
    /**
     * Gets a namespace or throws if it doesn't exist.
     * @param findFunction - Function to use to find the namespace.
     */
    getNamespaceOrThrow(findFunction: (declaration: NamespaceDeclaration) => boolean): NamespaceDeclaration;
    /**
     * Adds a type alias declaration as a child.
     * @param structure - Structure of the type alias declaration to add.
     */
    addTypeAlias(structure: OptionalKind<TypeAliasDeclarationStructure>): TypeAliasDeclaration;
    /**
     * Adds type alias declarations as a child.
     * @param structures - Structures of the type alias declarations to add.
     */
    addTypeAliases(structures: ReadonlyArray<OptionalKind<TypeAliasDeclarationStructure>>): TypeAliasDeclaration[];
    /**
     * Inserts an type alias declaration as a child.
     * @param index - Child index to insert at.
     * @param structure - Structure of the type alias declaration to insert.
     */
    insertTypeAlias(index: number, structure: OptionalKind<TypeAliasDeclarationStructure>): TypeAliasDeclaration;
    /**
     * Inserts type alias declarations as a child.
     * @param index - Child index to insert at.
     * @param structures - Structures of the type alias declarations to insert.
     */
    insertTypeAliases(index: number, structures: ReadonlyArray<OptionalKind<TypeAliasDeclarationStructure>>): TypeAliasDeclaration[];
    /**
     * Gets the direct type alias declaration children.
     */
    getTypeAliases(): TypeAliasDeclaration[];
    /**
     * Gets a type alias.
     * @param name - Name of the type alias.
     */
    getTypeAlias(name: string): TypeAliasDeclaration | undefined;
    /**
     * Gets a type alias.
     * @param findFunction - Function to use to find the type alias.
     */
    getTypeAlias(findFunction: (declaration: TypeAliasDeclaration) => boolean): TypeAliasDeclaration | undefined;
    /**
     * Gets a type alias or throws if it doesn't exist.
     * @param name - Name of the type alias.
     */
    getTypeAliasOrThrow(name: string): TypeAliasDeclaration;
    /**
     * Gets a type alias or throws if it doesn't exist.
     * @param findFunction - Function to use to find the type alias.
     */
    getTypeAliasOrThrow(findFunction: (declaration: TypeAliasDeclaration) => boolean): TypeAliasDeclaration;
    /**
     * Adds a variable statement.
     * @param structure - Structure of the variable statement.
     */
    addVariableStatement(structure: OptionalKind<VariableStatementStructure>): VariableStatement;
    /**
     * Adds variable statements.
     * @param structures - Structures of the variable statements.
     */
    addVariableStatements(structures: ReadonlyArray<OptionalKind<VariableStatementStructure>>): VariableStatement[];
    /**
     * Inserts a variable statement.
     * @param structure - Structure of the variable statement.
     */
    insertVariableStatement(index: number, structure: OptionalKind<VariableStatementStructure>): VariableStatement;
    /**
     * Inserts variable statements.
     * @param structures - Structures of the variable statements.
     */
    insertVariableStatements(index: number, structures: ReadonlyArray<OptionalKind<VariableStatementStructure>>): VariableStatement[];
    /**
     * Gets the direct variable statement children.
     */
    getVariableStatements(): VariableStatement[];
    /**
     * Gets a variable statement.
     * @param name - Name of one of the variable statement's declarations.
     */
    getVariableStatement(name: string): VariableStatement | undefined;
    /**
     * Gets a variable statement.
     * @param findFunction - Function to use to find the variable statement.
     */
    getVariableStatement(findFunction: (declaration: VariableStatement) => boolean): VariableStatement | undefined;
    /**
     * Gets a variable statement or throws if it doesn't exist.
     * @param name - Name of one of the variable statement's declarations.
     */
    getVariableStatementOrThrow(name: string): VariableStatement;
    /**
     * Gets a variable statement or throws if it doesn't exist.
     * @param findFunction - Function to use to find the variable statement.
     */
    getVariableStatementOrThrow(findFunction: (declaration: VariableStatement) => boolean): VariableStatement;
    /**
     * Gets all the variable declarations within the variable statement children.
     * @remarks This does not return the variable declarations within for statements or for of statements.
     */
    getVariableDeclarations(): VariableDeclaration[];
    /**
     * Gets a variable declaration.
     * @param name - Name of the variable declaration.
     */
    getVariableDeclaration(name: string): VariableDeclaration | undefined;
    /**
     * Gets a variable declaration.
     * @param findFunction - Function to use to find the variable declaration.
     */
    getVariableDeclaration(findFunction: (declaration: VariableDeclaration) => boolean): VariableDeclaration | undefined;
    /**
     * Gets a variable declaration or throws if it doesn't exist.
     * @param name - Name of the variable declaration.
     */
    getVariableDeclarationOrThrow(name: string): VariableDeclaration;
    /**
     * Gets a variable declaration or throws if it doesn't exist.
     * @param findFunction - Function to use to find the variable declaration.
     */
    getVariableDeclarationOrThrow(findFunction: (declaration: VariableDeclaration) => boolean): VariableDeclaration;
}

declare type StatementedNodeExtensionType = Node<ts.SourceFile | ts.FunctionDeclaration | ts.ModuleDeclaration | ts.FunctionLikeDeclaration | ts.CaseClause | ts.DefaultClause | ts.ModuleBlock>;

export interface KindToNodeMappingsWithCommentStatements extends ImplementedKindToNodeMappings {
    [kind: number]: Node;
    [SyntaxKind.SingleLineCommentTrivia]: CommentStatement;
    [SyntaxKind.MultiLineCommentTrivia]: CommentStatement;
}

export declare class SwitchStatement extends Statement<ts.SwitchStatement> {
    /**
     * Gets this switch statement's expression.
     */
    getExpression(): Expression;
    /**
     * Gets this switch statement's case block.
     */
    getCaseBlock(): CaseBlock;
    /**
     * Gets the switch statement's case block's clauses.
     */
    getClauses(): CaseOrDefaultClause[];
    /**
     * Removes the specified clause based on the provided index.
     * @param index - Index.
     */
    removeClause(index: number): CaseBlock;
    /**
     * Removes the specified clauses based on the provided index range.
     * @param indexRange - Index range.
     */
    removeClauses(indexRange: [number, number]): CaseBlock;
}

declare const ThrowStatementBase: typeof Statement;

export declare class ThrowStatement extends ThrowStatementBase<ts.ThrowStatement> {
    /**
     * Gets the throw statement's expression.
     */
    getExpression(): Expression | undefined;
    /**
     * Gets the throw statement's expression or throws undefined if it doesn't exist.
     */
    getExpressionOrThrow(): Expression;
}

declare const TryStatementBase: typeof Statement;

export declare class TryStatement extends TryStatementBase<ts.TryStatement> {
    /**
     * Gets this try statement's try block.
     */
    getTryBlock(): Block;
    /**
     * Gets this try statement's catch clause or undefined if none exists.
     */
    getCatchClause(): CatchClause | undefined;
    /**
     * Gets this try statement's catch clause or throws if none exists.
     */
    getCatchClauseOrThrow(): CatchClause;
    /**
     * Gets this try statement's finally block or undefined if none exists.
     */
    getFinallyBlock(): Block | undefined;
    /**
     * Gets this try statement's finally block or throws if none exists.
     */
    getFinallyBlockOrThrow(): Block;
}

declare const VariableStatementBase: Constructor<NamespaceChildableNode> & Constructor<JSDocableNode> & Constructor<AmbientableNode> & Constructor<ExportableNode> & Constructor<ModifierableNode> & typeof Statement;

export declare class VariableStatement extends VariableStatementBase<ts.VariableStatement> {
    /**
     * Get variable declaration list.
     */
    getDeclarationList(): VariableDeclarationList;
    /**
     * Get the variable declarations.
     */
    getDeclarations(): VariableDeclaration[];
    /**
     * Gets the variable declaration kind.
     */
    getDeclarationKind(): VariableDeclarationKind;
    /**
     * Gets the variable declaration kind keyword.
     */
    getDeclarationKindKeyword(): Node<ts.Node>;
    /**
     * Sets the variable declaration kind.
     * @param type - Type to set.
     */
    setDeclarationKind(type: VariableDeclarationKind): VariableDeclarationList;
    /**
     * Add a variable declaration to the statement.
     * @param structure - Structure representing the variable declaration to add.
     */
    addDeclaration(structure: OptionalKind<VariableDeclarationStructure>): VariableDeclaration;
    /**
     * Adds variable declarations to the statement.
     * @param structures - Structures representing the variable declarations to add.
     */
    addDeclarations(structures: ReadonlyArray<OptionalKind<VariableDeclarationStructure>>): VariableDeclaration[];
    /**
     * Inserts a variable declaration at the specified index within the statement.
     * @param index - Child index to insert at.
     * @param structure - Structure representing the variable declaration to insert.
     */
    insertDeclaration(index: number, structure: OptionalKind<VariableDeclarationStructure>): VariableDeclaration;
    /**
     * Inserts variable declarations at the specified index within the statement.
     * @param index - Child index to insert at.
     * @param structures - Structures representing the variable declarations to insert.
     */
    insertDeclarations(index: number, structures: ReadonlyArray<OptionalKind<VariableDeclarationStructure>>): VariableDeclaration[];
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<VariableStatementStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): VariableStatementStructure;
}

declare const WhileStatementBase: typeof IterationStatement;

export declare class WhileStatement extends WhileStatementBase<ts.WhileStatement> {
    /**
     * Gets this while statement's expression.
     */
    getExpression(): Expression;
}

export declare class WithStatement extends Statement<ts.WithStatement> {
    /**
     * Gets this with statement's expression.
     */
    getExpression(): Expression;
    /**
     * Gets this with statement's statement.
     */
    getStatement(): Statement;
}

export declare class ArrayTypeNode extends TypeNode<ts.ArrayTypeNode> {
    /**
     * Gets the array type node's element type node.
     */
    getElementTypeNode(): TypeNode;
}

export declare class ConditionalTypeNode extends TypeNode<ts.ConditionalTypeNode> {
    /**
     * Gets the conditional type node's check type.
     *
     * Ex. In `CheckType extends ExtendsType ? TrueType : FalseType` returns `CheckType`.
     */
    getCheckType(): TypeNode<ts.TypeNode>;
    /**
     * Gets the conditional type node's extends type.
     *
     * Ex. In `CheckType extends ExtendsType ? TrueType : FalseType` returns `ExtendsType`.
     */
    getExtendsType(): TypeNode<ts.TypeNode>;
    /**
     * Gets the conditional type node's true type.
     *
     * Ex. In `CheckType extends ExtendsType ? TrueType : FalseType` returns `TrueType`.
     */
    getTrueType(): TypeNode<ts.TypeNode>;
    /**
     * Gets the conditional type node's false type.
     *
     * Ex. In `CheckType extends ExtendsType ? TrueType : FalseType` returns `FalseType`.
     */
    getFalseType(): TypeNode<ts.TypeNode>;
}

export declare class ConstructorTypeNode extends FunctionOrConstructorTypeNodeBase<ts.ConstructorTypeNode> {
}

declare const ExpressionWithTypeArgumentsBase: Constructor<LeftHandSideExpressionedNode> & typeof TypeNode;

export declare class ExpressionWithTypeArguments extends ExpressionWithTypeArgumentsBase<ts.ExpressionWithTypeArguments> {
    /**
     * Gets the type arguments.
     */
    getTypeArguments(): TypeNode[];
}

declare const FunctionTypeNodeBase: Constructor<TypeParameteredNode> & typeof FunctionOrConstructorTypeNodeBase;

export declare class FunctionTypeNode extends FunctionTypeNodeBase<ts.FunctionTypeNode> {
}

declare const FunctionOrConstructorTypeNodeBaseBase: Constructor<SignaturedDeclaration> & typeof TypeNode;

export declare class FunctionOrConstructorTypeNodeBase<T extends ts.FunctionOrConstructorTypeNode = ts.FunctionOrConstructorTypeNode> extends FunctionOrConstructorTypeNodeBaseBase<T> {
}

declare const ImportTypeNodeBase: Constructor<TypeArgumentedNode> & typeof TypeNode;

export declare class ImportTypeNode extends ImportTypeNodeBase<ts.ImportTypeNode> {
    /**
     * Sets the argument text.
     * @param text - Text of the argument.
     */
    setArgument(text: string): this;
    /**
     * Gets the argument passed into the import type.
     */
    getArgument(): TypeNode;
    /**
     * Sets the qualifier text.
     * @param text - Text.
     */
    setQualifier(text: string): this;
    /**
     * Gets the qualifier of the import type if it exists or throws
     */
    getQualifierOrThrow(): EntityName;
    /**
     * Gets the qualifier of the import type if it exists or returns undefined.
     */
    getQualifier(): EntityName | undefined;
}

export declare class IndexedAccessTypeNode extends TypeNode<ts.IndexedAccessTypeNode> {
    /**
     * Gets the indexed access type node's object type node.
     *
     * This is `MyObjectType` in `MyObjectType["myIndex"]`.
     */
    getObjectTypeNode(): TypeNode;
    /**
     * Gets the indexed access type node's index type node.
     *
     * This is `"myIndex"` in `MyObjectType["myIndex"]`.
     */
    getIndexTypeNode(): TypeNode;
}

export declare class InferTypeNode extends TypeNode<ts.InferTypeNode> {
    /**
     * Gets the infer type node's type parameter.
     *
     * Ex. In `infer R` returns `R`.
     */
    getTypeParameter(): TypeParameterDeclaration;
}

export declare class IntersectionTypeNode extends TypeNode<ts.IntersectionTypeNode> {
    /**
     * Gets the intersection type nodes.
     */
    getTypeNodes(): TypeNode[];
}

export declare class LiteralTypeNode extends TypeNode<ts.LiteralTypeNode> {
    /**
     * Gets the literal type node's literal.
     */
    getLiteral(): BooleanLiteral | LiteralExpression | PrefixUnaryExpression;
}

export declare class ParenthesizedTypeNode extends TypeNode<ts.ParenthesizedTypeNode> {
    /**
     * Gets the node within the parentheses.
     */
    getTypeNode(): TypeNode;
    /**
     * Sets the type within the parentheses.
     * @param textOrWriterFunction - Text or writer function to set the type with.
     */
    setType(textOrWriterFunction: string | WriterFunction): this;
}

export declare class ThisTypeNode extends TypeNode<ts.ThisTypeNode> {
}

export declare class TupleTypeNode extends TypeNode<ts.TupleTypeNode> {
    /**
     * Gets the tuple element type nodes.
     */
    getElementTypeNodes(): TypeNode[];
}

declare const TypeAliasDeclarationBase: Constructor<TypeParameteredNode> & Constructor<TypedNode> & Constructor<JSDocableNode> & Constructor<AmbientableNode> & Constructor<ExportableNode> & Constructor<ModifierableNode> & Constructor<NamedNode> & typeof Statement;

export declare class TypeAliasDeclaration extends TypeAliasDeclarationBase<ts.TypeAliasDeclaration> {
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<TypeAliasDeclarationStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): TypeAliasDeclarationStructure;
}

declare const TypeLiteralNodeBase: Constructor<TypeElementMemberedNode> & typeof TypeNode;

export declare class TypeLiteralNode extends TypeLiteralNodeBase<ts.TypeLiteralNode> {
}

export declare class TypeNode<T extends ts.TypeNode = ts.TypeNode> extends Node<T> {
}

declare const TypeParameterDeclarationBase: Constructor<NamedNode> & typeof Node;

export declare class TypeParameterDeclaration extends TypeParameterDeclarationBase<ts.TypeParameterDeclaration> {
    /**
     * Gets the constraint of the type parameter.
     */
    getConstraint(): TypeNode | undefined;
    /**
     * Gets the constraint of the type parameter or throws if it doesn't exist.
     */
    getConstraintOrThrow(): TypeNode<ts.TypeNode>;
    /**
     * Sets the type parameter constraint.
     * @param text - Text to set as the constraint.
     */
    setConstraint(text: string | WriterFunction): this;
    /**
     * Removes the constraint type node.
     */
    removeConstraint(): this;
    /**
     * Gets the default node of the type parameter.
     */
    getDefault(): TypeNode | undefined;
    /**
     * Gets the default node of the type parameter or throws if it doesn't exist.
     */
    getDefaultOrThrow(): TypeNode<ts.TypeNode>;
    /**
     * Sets the type parameter default type node.
     * @param text - Text to set as the default type node.
     */
    setDefault(text: string | WriterFunction): this;
    /**
     * Removes the default type node.
     */
    removeDefault(): this;
    /**
     * Removes this type parameter.
     */
    remove(): void;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<TypeParameterDeclarationStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): TypeParameterDeclarationStructure;
}

export declare class TypeReferenceNode extends TypeNode<ts.TypeReferenceNode> {
    /**
     * Gets the type name.
     */
    getTypeName(): EntityName;
    /**
     * Gets the type arguments.
     */
    getTypeArguments(): TypeNode[];
}

export declare class UnionTypeNode extends TypeNode<ts.UnionTypeNode> {
    /**
     * Gets the union type nodes.
     */
    getTypeNodes(): TypeNode[];
}

declare const VariableDeclarationBase: Constructor<ExportGetableNode> & Constructor<ExclamationTokenableNode> & Constructor<TypedNode> & Constructor<InitializerExpressionableNode> & Constructor<BindingNamedNode> & typeof Node;

export declare class VariableDeclaration extends VariableDeclarationBase<ts.VariableDeclaration> {
    /**
     * Removes this variable declaration.
     */
    remove(): void;
    /**
     * Gets the corresponding variable statement if it exists. Throws for variable declarations in for statements.
     */
    getVariableStatementOrThrow(): TryStatement & VariableStatement;
    /**
     * Gets the corresponding variable statement if it exists. Returns undefined for variable declarations in for statements.
     */
    getVariableStatement(): (TryStatement & VariableStatement) | undefined;
    /**
     * Sets the node from a structure.
     * @param structure - Structure to set the node with.
     */
    set(structure: Partial<VariableDeclarationStructure>): this;
    /**
     * Gets the structure equivalent to this node.
     */
    getStructure(): VariableDeclarationStructure;
}

export declare enum VariableDeclarationKind {
    Var = "var",
    Let = "let",
    Const = "const"
}

declare const VariableDeclarationListBase: Constructor<ModifierableNode> & typeof Node;

export declare class VariableDeclarationList extends VariableDeclarationListBase<ts.VariableDeclarationList> {
    /**
     * Get the variable declarations.
     */
    getDeclarations(): VariableDeclaration[];
    /**
     * Gets the variable declaration kind.
     */
    getDeclarationKind(): VariableDeclarationKind;
    /**
     * Gets the variable declaration kind keyword.
     */
    getDeclarationKindKeyword(): Node;
    /**
     * Sets the variable declaration kind.
     * @param type - Type to set.
     */
    setDeclarationKind(type: VariableDeclarationKind): this;
    /**
     * Add a variable declaration to the statement.
     * @param structure - Structure representing the variable declaration to add.
     */
    addDeclaration(structure: OptionalKind<VariableDeclarationStructure>): VariableDeclaration;
    /**
     * Adds variable declarations to the statement.
     * @param structures - Structures representing the variable declarations to add.
     */
    addDeclarations(structures: ReadonlyArray<OptionalKind<VariableDeclarationStructure>>): VariableDeclaration[];
    /**
     * Inserts a variable declaration at the specified index within the statement.
     * @param index - Child index to insert at.
     * @param structure - Structure representing the variable declaration to insert.
     */
    insertDeclaration(index: number, structure: OptionalKind<VariableDeclarationStructure>): VariableDeclaration;
    /**
     * Inserts variable declarations at the specified index within the statement.
     * @param index - Child index to insert at.
     * @param structures - Structures representing the variable declarations to insert.
     */
    insertDeclarations(index: number, structures: ReadonlyArray<OptionalKind<VariableDeclarationStructure>>): VariableDeclaration[];
}

export declare class Signature {
    /**
     * Gets the underlying compiler signature.
     */
    readonly compilerSignature: ts.Signature;
    private constructor();
    /**
     * Gets the type parameters.
     */
    getTypeParameters(): TypeParameter[];
    /**
     * Gets the parameters.
     */
    getParameters(): Symbol[];
    /**
     * Gets the signature return type.
     */
    getReturnType(): Type;
    /**
     * Get the documentation comments.
     */
    getDocumentationComments(): SymbolDisplayPart[];
    /**
     * Gets the JS doc tags.
     */
    getJsDocTags(): JSDocTagInfo[];
    /**
     * Gets the signature's declaration.
     */
    getDeclaration(): ArrowFunction | MethodSignature | MethodDeclaration | ConstructorDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | CallSignatureDeclaration | ConstructSignatureDeclaration | IndexSignatureDeclaration | FunctionTypeNode | ConstructorTypeNode | FunctionExpression | FunctionDeclaration | JSDocFunctionType;
}

export declare class Symbol {
    /**
     * Gets the underlying compiler symbol.
     */
    readonly compilerSymbol: ts.Symbol;
    private constructor();
    /**
     * Gets the symbol name.
     */
    getName(): string;
    /**
     * Gets the escaped name.
     */
    getEscapedName(): string;
    /**
     * Gets the aliased symbol or throws if it doesn't exist.
     */
    getAliasedSymbolOrThrow(): Symbol;
    /**
     * Gets the aliased symbol or returns undefined if it doesn't exist.
     */
    getAliasedSymbol(): Symbol | undefined;
    /**
     * Gets the export symbol of the symbol if its a local symbol with a corresponding export symbol. Otherwise returns the current symbol.
     *
     * The following is from the compiler API documentation:
     *
     * For example, at `export type T = number;`:
     *     - `getSymbolAtLocation` at the location `T` will return the exported symbol for `T`.
     *     - But the result of `getSymbolsInScope` will contain the *local* symbol for `T`, not the exported symbol.
     *     - Calling `getExportSymbol` on that local symbol will return the exported symbol.
     */
    getExportSymbol(): Symbol;
    /**
     * Gets if the symbol is an alias.
     */
    isAlias(): boolean;
    /**
     * Gets the symbol flags.
     */
    getFlags(): SymbolFlags;
    /**
     * Gets if the symbol has the specified flags.
     * @param flags - Flags to check if the symbol has.
     */
    hasFlags(flags: SymbolFlags): boolean;
    /**
     * Gets the value declaration of a symbol or throws if it doesn't exist.
     */
    getValueDeclarationOrThrow(): Node;
    /**
     * Gets the value declaration of the symbol or returns undefined if it doesn't exist.
     */
    getValueDeclaration(): Node | undefined;
    /**
     * Gets the symbol declarations.
     */
    getDeclarations(): Node[];
    /**
     * Gets the export of the symbol by the specified name or throws if not exists.
     * @param name - Name of the export.
     */
    getExportOrThrow(name: string): Symbol;
    /**
     * Gets the export of the symbol by the specified name or returns undefined if not exists.
     * @param name - Name of the export.
     */
    getExport(name: string): Symbol | undefined;
    /**
     * Gets the exports from the symbol.
     */
    getExports(): Symbol[];
    /**
     * Gets the global export of the symbol by the specified name or throws if not exists.
     * @param name - Name of the global export.
     */
    getGlobalExportOrThrow(name: string): Symbol;
    /**
     * Gets the global export of the symbol by the specified name or returns undefined if not exists.
     * @param name - Name of the global export.
     */
    getGlobalExport(name: string): Symbol | undefined;
    /**
     * Gets the global exports from the symbol.
     */
    getGlobalExports(): Symbol[];
    /**
     * Gets the member of the symbol by the specified name or throws if not exists.
     * @param name - Name of the export.
     */
    getMemberOrThrow(name: string): Symbol;
    /**
     * Gets the member of the symbol by the specified name or returns undefined if not exists.
     * @param name - Name of the member.
     */
    getMember(name: string): Symbol | undefined;
    /**
     * Gets the members of the symbol
     */
    getMembers(): Symbol[];
    /**
     * Gets the declared type of the symbol.
     */
    getDeclaredType(): Type;
    /**
     * Gets the type of the symbol at a location.
     * @param node - Location to get the type at for this symbol.
     */
    getTypeAtLocation(node: Node): Type<ts.Type>;
    /**
     * Gets the fully qualified name.
     */
    getFullyQualifiedName(): string;
}

export interface FormatCodeSettings extends ts.FormatCodeSettings {
    ensureNewLineAtEndOfFile?: boolean;
}

/**
 * Options for renaming a node.
 */
export interface RenameOptions {
    /**
     * Whether comments referencing this node should be renamed.
     * @remarks False by default.
     */
    renameInComments?: boolean;
    /**
     * Whether strings referencing this node should be renamed.
     * @remarks False by default.
     */
    renameInStrings?: boolean;
    /**
     * Whether to enable renaming shorthand property assignments, binding elements, and import & export specifiers without changing behaviour.
     * @remarks Defaults to the `usePrefixAndSuffixTextForRename` manipulation setting.
     * This setting is only available when using TypeScript 3.4+.
     */
    usePrefixAndSuffixText?: boolean;
}

/**
 * User preferences for refactoring.
 */
export interface UserPreferences extends ts.UserPreferences {
}

/**
 * Host for implementing custom module and/or type reference directive resolution.
 */
export interface ResolutionHost {
    resolveModuleNames?: ts.LanguageServiceHost["resolveModuleNames"];
    getResolvedModuleWithFailedLookupLocationsFromCache?: ts.LanguageServiceHost["getResolvedModuleWithFailedLookupLocationsFromCache"];
    resolveTypeReferenceDirectives?: ts.LanguageServiceHost["resolveTypeReferenceDirectives"];
}

/**
 * Factory used to create a resolution host.
 * @remarks The compiler options are retrieved via a function in order to get the project's current compiler options.
 */
export declare type ResolutionHostFactory = (moduleResolutionHost: ts.ModuleResolutionHost, getCompilerOptions: () => ts.CompilerOptions) => ResolutionHost;

export declare class LanguageService {
    private readonly _compilerObject;
    private readonly _compilerHost;
    private _program;
    /**
     * Gets the compiler language service.
     */
    readonly compilerObject: ts.LanguageService;
    private _getFilePathFromFilePathOrSourceFile;
    private _getFilledSettings;
    private _getFilledUserPreferences;
    private constructor();
    /**
     * Gets the language service's program.
     */
    getProgram(): Program;
    /**
     * Gets the definitions for the specified node.
     * @param node - Node.
     */
    getDefinitions(node: Node): DefinitionInfo[];
    /**
     * Gets the definitions at the specified position.
     * @param sourceFile - Source file.
     * @param pos - Position.
     */
    getDefinitionsAtPosition(sourceFile: SourceFile, pos: number): DefinitionInfo[];
    /**
     * Gets the implementations for the specified node.
     * @param node - Node.
     */
    getImplementations(node: Node): ImplementationLocation[];
    /**
     * Gets the implementations at the specified position.
     * @param sourceFile - Source file.
     * @param pos - Position.
     */
    getImplementationsAtPosition(sourceFile: SourceFile, pos: number): ImplementationLocation[];
    /**
     * Finds references based on the specified node.
     * @param node - Node to find references for.
     */
    findReferences(node: Node): ReferencedSymbol[];
    /**
     * Finds the nodes that reference the definition(s) of the specified node.
     * @param node - Node.
     */
    findReferencesAsNodes(node: Node): Node<ts.Node>[];
    /**
     * Finds references based on the specified position.
     * @param sourceFile - Source file.
     * @param pos - Position to find the reference at.
     */
    findReferencesAtPosition(sourceFile: SourceFile, pos: number): ReferencedSymbol[];
    /**
     * Find the rename locations for the specified node.
     * @param node - Node to get the rename locations for.
     * @param options - Options for renaming.
     */
    findRenameLocations(node: Node, options?: RenameOptions): RenameLocation[];
    /**
     * Gets the suggestion diagnostics.
     * @param filePathOrSourceFile - The source file or file path to get suggestions for.
     */
    getSuggestionDiagnostics(filePathOrSourceFile: SourceFile | string): DiagnosticWithLocation[];
    /**
     * Gets the formatting edits for a range.
     * @param filePath - File path.
     * @param range - Position range.
     * @param formatSettings - Format code settings.
     */
    getFormattingEditsForRange(filePath: string, range: [number, number], formatSettings: FormatCodeSettings): TextChange[];
    /**
     * Gets the formatting edits for a document.
     * @param filePath - File path of the source file.
     * @param formatSettings - Format code settings.
     */
    getFormattingEditsForDocument(filePath: string, formatSettings: FormatCodeSettings): TextChange[];
    /**
     * Gets the formatted text for a document.
     * @param filePath - File path of the source file.
     * @param formatSettings - Format code settings.
     */
    getFormattedDocumentText(filePath: string, formatSettings: FormatCodeSettings): string;
    /**
     * Gets the emit output of a source file.
     * @param sourceFile - Source file.
     * @param emitOnlyDtsFiles - Whether to only emit the d.ts files.
     */
    getEmitOutput(sourceFile: SourceFile, emitOnlyDtsFiles?: boolean): EmitOutput;
    /**
     * Gets the emit output of a source file.
     * @param filePath - File path.
     * @param emitOnlyDtsFiles - Whether to only emit the d.ts files.
     */
    getEmitOutput(filePath: string, emitOnlyDtsFiles?: boolean): EmitOutput;
    /**
     * Gets the indentation at the specified position.
     * @param sourceFile - Source file.
     * @param position - Position.
     * @param settings - Editor settings.
     */
    getIdentationAtPosition(sourceFile: SourceFile, position: number, settings?: EditorSettings): number;
    /**
     * Gets the indentation at the specified position.
     * @param filePath - File path.
     * @param position - Position.
     * @param settings - Editor settings.
     */
    getIdentationAtPosition(filePath: string, position: number, settings?: EditorSettings): number;
    /**
     * Gets the file text changes for organizing the imports in a source file.
     *
     * @param sourceFile - Source file.
     * @param formatSettings - Format code settings.
     * @param userPreferences - User preferences for refactoring.
     */
    organizeImports(sourceFile: SourceFile, formatSettings?: FormatCodeSettings, userPreferences?: UserPreferences): FileTextChanges[];
    /**
     * Gets the file text changes for organizing the imports in a source file.
     *
     * @param filePath - File path of the source file.
     * @param formatSettings - Format code settings.
     * @param userPreferences - User preferences for refactoring.
     */
    organizeImports(filePath: string, formatSettings?: FormatCodeSettings, userPreferences?: UserPreferences): FileTextChanges[];
    /**
     * Gets the edit information for applying a refactor at a the provided position in a source file.
     * @param filePathOrSourceFile - File path or source file to get the edits for.
     * @param formatSettings - Fomat code settings.
     * @param positionOrRange - Position in the source file where to apply given refactor.
     * @param refactorName - Refactor name.
     * @param actionName - Refactor action name.
     * @param preferences - User preferences for refactoring.
     */
    getEditsForRefactor(filePathOrSourceFile: string | SourceFile, formatSettings: FormatCodeSettings, positionOrRange: number | {
            getPos(): number;
            getEnd(): number;
        }, refactorName: string, actionName: string, preferences?: UserPreferences): RefactorEditInfo | undefined;
    /**
     * Gets file changes and actions to perform for the provided fixId.
     * @param filePathOrSourceFile - File path or source file to get the combined code fixes for.
     * @param fixId - Identifier for the code fix (ex. "fixMissingImport"). These ids are found in the `ts.codefix` namespace in the compiler api source.
     * @param formatSettings - Format code settings.
     * @param preferences - User preferences for refactoring.
     */
    getCombinedCodeFix(filePathOrSourceFile: string | SourceFile, fixId: {}, formatSettings?: FormatCodeSettings, preferences?: UserPreferences): CombinedCodeActions;
    /**
     * Gets the edit information for applying a code fix at the provided text range in a source file.
     * @param filePathOrSourceFile - File path or source file to get the code fixes for.
     * @param start - Start position of the text range to be fixed.
     * @param end - End position of the text range to be fixed.
     * @param errorCodes - One or more error codes associated with the code fixes to retrieve.
     * @param formatOptions - Format code settings.
     * @param preferences - User preferences for refactoring.
     */
    getCodeFixesAtPosition(filePathOrSourceFile: string | SourceFile, start: number, end: number, errorCodes: ReadonlyArray<number>, formatOptions?: FormatCodeSettings, preferences?: UserPreferences): CodeFixAction[];
}

/**
 * Options for emitting from a Program.
 */
export interface ProgramEmitOptions extends EmitOptions {
    writeFile?: ts.WriteFileCallback;
}

/**
 * Options for emitting.
 */
export interface EmitOptions extends EmitOptionsBase {
    /**
     * Optional source file to only emit.
     */
    targetSourceFile?: SourceFile;
}

export interface EmitOptionsBase {
    /**
     * Whether only .d.ts files should be emitted.
     */
    emitOnlyDtsFiles?: boolean;
    /**
     * Transformers to act on the files when emitting.
     */
    customTransformers?: ts.CustomTransformers;
}

/**
 * Wrapper around Program.
 */
export declare class Program {
    /**
     * Gets the underlying compiler program.
     */
    readonly compilerObject: ts.Program;
    private constructor();
    /**
     * Get the program's type checker.
     */
    getTypeChecker(): TypeChecker;
    /**
     * Asynchronously emits the TypeScript files as JavaScript files.
     * @param options - Options for emitting.
     */
    emit(options?: ProgramEmitOptions): Promise<EmitResult>;
    /**
     * Synchronously emits the TypeScript files as JavaScript files.
     * @param options - Options for emitting.
     * @remarks Use `emit()` as the asynchronous version will be much faster.
     */
    emitSync(options?: ProgramEmitOptions): EmitResult;
    /**
     * Emits the TypeScript files to JavaScript files to memory.
     * @param options - Options for emitting.
     */
    emitToMemory(options?: EmitOptions): MemoryEmitResult;
    /**
     * Gets the syntactic diagnostics.
     * @param sourceFile - Optional source file to filter by.
     */
    getSyntacticDiagnostics(sourceFile?: SourceFile): DiagnosticWithLocation[];
    /**
     * Gets the semantic diagnostics.
     * @param sourceFile - Optional source file to filter by.
     */
    getSemanticDiagnostics(sourceFile?: SourceFile): Diagnostic[];
    /**
     * Gets the declaration diagnostics.
     * @param sourceFile - Optional source file to filter by.
     */
    getDeclarationDiagnostics(sourceFile?: SourceFile): DiagnosticWithLocation[];
    /**
     * Gets the global diagnostics.
     */
    getGlobalDiagnostics(): Diagnostic[];
    /**
     * Gets the emit module resolution kind.
     */
    getEmitModuleResolutionKind(): ModuleResolutionKind;
    /**
     * Gets if the provided source file was discovered while loading an external library.
     * @param sourceFile - Source file.
     */
    isSourceFileFromExternalLibrary(sourceFile: SourceFile): boolean;
}

/**
 * Represents a code action.
 */
export declare class CodeAction<TCompilerObject extends ts.CodeAction = ts.CodeAction> {
    /**
     * Gets the compiler object.
     */
    readonly compilerObject: TCompilerObject;
    protected constructor();
    /**
     * Description of the code action.
     */
    getDescription(): string;
    /**
     * Text changes to apply to each file as part of the code action.
     */
    getChanges(): FileTextChanges[];
}

/**
 * Represents file changes.
 *
 * @remarks Commands are currently not implemented.
 */
export declare class CombinedCodeActions {
    /**
     * Gets the compiler object.
     */
    readonly compilerObject: ts.CombinedCodeActions;
    private constructor();
    /**
     * Text changes to apply to each file.
     */
    getChanges(): FileTextChanges[];
    /**
     * Executes the combined code actions.
     *
     * WARNING: This will cause all nodes to be forgotten in the changed files.
     * @options - Options used when applying the changes.
     */
    applyChanges(options?: ApplyFileTextChangesOptions): this;
}

/**
 * Represents a code fix action.
 */
export declare class CodeFixAction extends CodeAction<ts.CodeFixAction> {
    /**
     * Short name to identify the fix, for use by telemetry.
     */
    getFixName(): string;
    /**
     * If present, one may call 'getCombinedCodeFix' with this fixId.
     * This may be omitted to indicate that the code fix can't be applied in a group.
     */
    getFixId(): {} | undefined;
    /**
     * Gets the description of the code fix when fixing everything.
     */
    getFixAllDescription(): string | undefined;
}

/**
 * Definition info.
 */
export declare class DefinitionInfo<TCompilerObject extends ts.DefinitionInfo = ts.DefinitionInfo> extends DocumentSpan<TCompilerObject> {
    protected constructor();
    /**
     * Gets the kind.
     */
    getKind(): ts.ScriptElementKind;
    /**
     * Gets the name.
     */
    getName(): string;
    /**
     * Gets the container kind.
     */
    getContainerKind(): ts.ScriptElementKind;
    /**
     * Gets the container name.
     */
    getContainerName(): string;
    /**
     * Gets the declaration node.
     */
    getDeclarationNode(): Node | undefined;
}

/**
 * Diagnostic.
 */
export declare class Diagnostic<TCompilerObject extends ts.Diagnostic = ts.Diagnostic> {
    /**
     * Gets the underlying compiler diagnostic.
     */
    readonly compilerObject: TCompilerObject;
    protected constructor();
    /**
     * Gets the source file.
     */
    getSourceFile(): SourceFile | undefined;
    /**
     * Gets the message text.
     */
    getMessageText(): string | DiagnosticMessageChain;
    /**
     * Gets the line number.
     */
    getLineNumber(): number | undefined;
    /**
     * Gets the start.
     */
    getStart(): number | undefined;
    /**
     * Gets the length.
     */
    getLength(): number | undefined;
    /**
     * Gets the diagnostic category.
     */
    getCategory(): DiagnosticCategory;
    /**
     * Gets the code of the diagnostic.
     */
    getCode(): number;
    /**
     * Gets the source.
     */
    getSource(): string | undefined;
}

/**
 * Diagnostic message chain.
 */
export declare class DiagnosticMessageChain {
    /**
     * Gets the underlying compiler object.
     */
    readonly compilerObject: ts.DiagnosticMessageChain;
    private constructor();
    /**
     * Gets the message text.
     */
    getMessageText(): string;
    /**
     * Gets th enext diagnostic message chain in the chain.
     */
    getNext(): DiagnosticMessageChain | undefined;
    /**
     * Gets the code of the diagnostic message chain.
     */
    getCode(): number;
    /**
     * Gets the category of the diagnostic message chain.
     */
    getCategory(): DiagnosticCategory;
}

export declare class DiagnosticWithLocation extends Diagnostic<ts.DiagnosticWithLocation> {
    private constructor();
    /**
     * Gets the line number.
     */
    getLineNumber(): number;
    /**
     * Gets the start.
     */
    getStart(): number;
    /**
     * Gets the length
     */
    getLength(): number;
    /**
     * Gets the source file.
     */
    getSourceFile(): SourceFile;
}

/**
 * Document span.
 */
export declare class DocumentSpan<TCompilerObject extends ts.DocumentSpan = ts.DocumentSpan> {
    /**
     * Gets the compiler object.
     */
    readonly compilerObject: TCompilerObject;
    protected constructor();
    /**
     * Gets the source file this reference is in.
     */
    getSourceFile(): SourceFile;
    /**
     * Gets the text span.
     */
    getTextSpan(): TextSpan;
    /**
     * Gets the node at the start of the text span.
     */
    getNode(): Node<ts.Node>;
    /**
     * Gets the original text span if the span represents a location that was remapped.
     */
    getOriginalTextSpan(): TextSpan | undefined;
    /**
     * Gets the original file name if the span represents a location that was remapped.
     */
    getOriginalFileName(): string | undefined;
}

/**
 * Output of an emit on a single file.
 */
export declare class EmitOutput {
    private readonly _filePath;
    /**
     * TypeScript compiler emit result.
     */
    readonly compilerObject: ts.EmitOutput;
    private constructor();
    /**
     * Gets if the emit was skipped.
     */
    getEmitSkipped(): boolean;
    /**
     * Gets the output files.
     */
    getOutputFiles(): OutputFile[];
}

/**
 * Result of an emit.
 */
export declare class EmitResult {
    /**
     * TypeScript compiler emit result.
     */
    readonly compilerObject: ts.EmitResult;
    protected constructor();
    /**
     * If the emit was skipped.
     */
    getEmitSkipped(): boolean;
    /**
     * Contains declaration emit diagnostics.
     *
     * If the `noEmitOnError` compiler option is true, this will also include the program's semantic, syntactic, global, options, and if enabled declaration diagnostics.
     * @remarks If you are looking for non-declaration emit diagnostics, then call `Project#getPreEmitDiagnostics()` or get specific diagnostics available from the program.
     */
    getDiagnostics(): Diagnostic<ts.Diagnostic>[];
}

export interface ApplyFileTextChangesOptions {
    /**
     * If a file should be overwritten when the file text change is for a new file, but the file currently exists.
     */
    overwrite?: boolean;
}

export declare class FileTextChanges {
    private constructor();
    /**
     * Gets the file path.
     */
    getFilePath(): string;
    /**
     * Gets the source file if it was in the cache at the time of this class' creation.
     */
    getSourceFile(): SourceFile | undefined;
    /**
     * Gets the text changes
     */
    getTextChanges(): TextChange[];
    /**
     * Applies the text changes to the file. This modifies and possibly creates a new source file.
     *
     * WARNING: This will forget any previously navigated descendant nodes in the source file.
     * @param options - Options for applying the text changes to the file.
     */
    applyChanges(options?: ApplyFileTextChangesOptions): this | undefined;
    /**
     * Gets if this change is for creating a new file.
     */
    isNewFile(): boolean;
}

export declare class ImplementationLocation extends DocumentSpan<ts.ImplementationLocation> {
    private constructor();
    /**
     * Gets the kind.
     */
    getKind(): ts.ScriptElementKind;
    /**
     * Gets the display parts.
     */
    getDisplayParts(): SymbolDisplayPart[];
}

/**
 * The emitted file in memory.
 */
export interface MemoryEmitResultFile {
    /**
     * File path that was emitted to.
     */
    filePath: string;
    /**
     * The text that was emitted.
     */
    text: string;
    /**
     * Whether the byte order mark should be written.
     */
    writeByteOrderMark: boolean;
}

/**
 * Result of an emit to memory.
 */
export declare class MemoryEmitResult extends EmitResult {
    private readonly _files;
    private constructor();
    /**
     * Gets the files that were emitted to memory.
     */
    getFiles(): MemoryEmitResultFile[];
    /**
     * Asynchronously writes the files to the file system.
     */
    saveFiles(): Promise<void[]>;
    /**
     * Synchronously writes the files to the file system.
     * @remarks Use `saveFiles()` as the asynchronous version will be much faster.
     */
    saveFilesSync(): void;
}

/**
 * Output file of an emit.
 */
export declare class OutputFile {
    /**
     * TypeScript compiler output file.
     */
    readonly compilerObject: ts.OutputFile;
    private constructor();
    /**
     * Gets the file path.
     */
    getFilePath(): string;
    /**
     * Gets whether the byte order mark should be written.
     */
    getWriteByteOrderMark(): boolean;
    /**
     * Gets the file text.
     */
    getText(): string;
}

/**
 * Set of edits to make in response to a refactor action, plus an optional location where renaming should be invoked from.
 */
export declare class RefactorEditInfo {
    /**
     * Gets the compiler refactor edit info.
     */
    readonly compilerObject: ts.RefactorEditInfo;
    private constructor();
    /**
     * Gets refactor file text changes
     */
    getEdits(): FileTextChanges[];
    /**
     * Gets the file path for a rename refactor.
     */
    getRenameFilePath(): string | undefined;
    /**
     * Location where renaming should be invoked from.
     */
    getRenameLocation(): number | undefined;
    /**
     * Executes the combined code actions.
     *
     * WARNING: This will cause all nodes to be forgotten in the changed files.
     * @options - Options used when applying the changes.
     */
    applyChanges(options?: ApplyFileTextChangesOptions): this;
}

/**
 * Referenced symbol.
 */
export declare class ReferencedSymbol {
    /**
     * Gets the compiler referenced symbol.
     */
    readonly compilerObject: ts.ReferencedSymbol;
    private constructor();
    /**
     * Gets the definition.
     */
    getDefinition(): ReferencedSymbolDefinitionInfo;
    /**
     * Gets the references.
     */
    getReferences(): ReferenceEntry[];
}

export declare class ReferencedSymbolDefinitionInfo extends DefinitionInfo<ts.ReferencedSymbolDefinitionInfo> {
    private constructor();
    /**
     * Gets the display parts.
     */
    getDisplayParts(): SymbolDisplayPart[];
}

export declare class ReferenceEntry extends DocumentSpan<ts.ReferenceEntry> {
    private constructor();
    isWriteAccess(): boolean;
    /**
     * If this is the definition reference.
     */
    isDefinition(): boolean;
    isInString(): true | undefined;
}

/**
 * Rename location.
 */
export declare class RenameLocation extends DocumentSpan<ts.RenameLocation> {
    /**
     * Gets the text to insert before the rename.
     */
    getPrefixText(): string | undefined;
    /**
     * Gets the text to insert after the rename.
     */
    getSuffixText(): string | undefined;
}

/**
 * Symbol display part.
 */
export declare class SymbolDisplayPart {
    /**
     * Gets the compiler symbol display part.
     */
    readonly compilerObject: ts.SymbolDisplayPart;
    private constructor();
    /**
     * Gets the text.
     */
    getText(): string;
    /**
     * Gets the kind.
     *
     * Examples: "text", "lineBreak"
     */
    getKind(): string;
}

/**
 * Represents a text change.
 */
export declare class TextChange {
    /**
     * Gets the compiler text change.
     */
    readonly compilerObject: ts.TextChange;
    private constructor();
    /**
     * Gets the text span.
     */
    getSpan(): TextSpan;
    /**
     * Gets the new text.
     */
    getNewText(): string;
}

/**
 * Represents a span of text.
 */
export declare class TextSpan {
    /**
     * Gets the compiler text span.
     */
    readonly compilerObject: ts.TextSpan;
    private constructor();
    /**
     * Gets the start.
     */
    getStart(): number;
    /**
     * Gets the start + length.
     */
    getEnd(): number;
    /**
     * Gets the length.
     */
    getLength(): number;
}

/**
 * Wrapper around the TypeChecker.
 */
export declare class TypeChecker {
    /**
     * Gets the compiler's TypeChecker.
     */
    readonly compilerObject: ts.TypeChecker;
    private _getDefaultTypeFormatFlags;
    private constructor();
    /**
     * Gets the ambient module symbols (ex. modules in the @types folder or node_modules).
     */
    getAmbientModules(): Symbol[];
    /**
     * Gets the apparent type of a type.
     * @param type - Type to get the apparent type of.
     */
    getApparentType(type: Type): Type<ts.Type>;
    /**
     * Gets the constant value of a declaration.
     * @param node - Node to get the constant value from.
     */
    getConstantValue(node: EnumMember): string | number | undefined;
    /**
     * Gets the fully qualified name of a symbol.
     * @param symbol - Symbol to get the fully qualified name of.
     */
    getFullyQualifiedName(symbol: Symbol): string;
    /**
     * Gets the type at the specified location.
     * @param node - Node to get the type for.
     */
    getTypeAtLocation(node: Node): Type;
    /**
     * Gets the contextual type of an expression.
     * @param expression - Expression.
     */
    getContextualType(expression: Expression): Type | undefined;
    /**
     * Gets the type of a symbol at the specified location.
     * @param symbol - Symbol to get the type for.
     * @param node - Location to get the type for.
     */
    getTypeOfSymbolAtLocation(symbol: Symbol, node: Node): Type;
    /**
     * Gets the declared type of a symbol.
     * @param symbol - Symbol to get the type for.
     */
    getDeclaredTypeOfSymbol(symbol: Symbol): Type;
    /**
     * Gets the symbol at the specified location or undefined if none exists.
     * @param node - Node to get the symbol for.
     */
    getSymbolAtLocation(node: Node): Symbol | undefined;
    /**
     * Gets the aliased symbol of a symbol.
     * @param symbol - Symbol to get the alias symbol of.
     */
    getAliasedSymbol(symbol: Symbol): Symbol | undefined;
    /**
     * Gets the export symbol of a local symbol with a corresponding export symbol. Otherwise returns the input symbol.
     *
     * The following is from the compiler API documentation:
     *
     * For example, at `export type T = number;`:
     *     - `getSymbolAtLocation` at the location `T` will return the exported symbol for `T`.
     *     - But the result of `getSymbolsInScope` will contain the *local* symbol for `T`, not the exported symbol.
     *     - Calling `getExportSymbolOfSymbol` on that local symbol will return the exported symbol.
     */
    getExportSymbolOfSymbol(symbol: Symbol): Symbol;
    /**
     * Gets the properties of a type.
     * @param type - Type.
     */
    getPropertiesOfType(type: Type): Symbol[];
    /**
     * Gets the type text
     * @param type - Type to get the text of.
     * @param enclosingNode - Enclosing node.
     * @param typeFormatFlags - Type format flags.
     */
    getTypeText(type: Type, enclosingNode?: Node, typeFormatFlags?: TypeFormatFlags): string;
    /**
     * Gets the return type of a signature.
     * @param signature - Signature to get the return type of.
     */
    getReturnTypeOfSignature(signature: Signature): Type;
    /**
     * Gets a signature from a node.
     * @param node - Node to get the signature from.
     */
    getSignatureFromNode(node: Node<ts.SignatureDeclaration>): Signature | undefined;
    /**
     * Gets the exports of a module.
     * @param moduleSymbol - Module symbol.
     */
    getExportsOfModule(moduleSymbol: Symbol): Symbol[];
    /**
     * Gets the local target symbol of the provided export specifier.
     * @param exportSpecifier - Export specifier.
     */
    getExportSpecifierLocalTargetSymbol(exportSpecifier: ExportSpecifier): Symbol | undefined;
    /**
     * Gets the resolved signature from a node or returns undefined if the signature can't be resolved.
     * @param node - Node to get the signature from.
     */
    getResolvedSignature(node: CallLikeExpression): Signature | undefined;
    /**
     * Gets the resolved signature from a node or throws if the signature cannot be resolved.
     * @param node - Node to get the signature from.
     */
    getResolvedSignatureOrThrow(node: CallLikeExpression): Signature;
    /**
     * Gets the base type of a literal type.
     *
     * For example, for a number literal type it will return the number type.
     * @param type - Literal type to get the base type of.
     */
    getBaseTypeOfLiteralType(type: Type): Type<ts.Type>;
    /**
     * Gets the symbols in the scope of the provided node.
     *
     * Note: This will always return the local symbols. If you want the export symbol from a local symbol, then
     * use the `#getExportSymbolOfSymbol(symbol)` method.
     * @param node - Node to check the scope for.
     * @param meaning - Meaning of symbol to filter by.
     */
    getSymbolsInScope(node: Node, meaning: SymbolFlags): Symbol[];
}

export declare class Type<TType extends ts.Type = ts.Type> {
    /**
     * Gets the underlying compiler type.
     */
    readonly compilerType: TType;
    private _hasTypeFlag;
    private _hasObjectFlag;
    protected constructor();
    /**
     * Gets the type text.
     * @param enclosingNode - The enclosing node.
     * @param typeFormatFlags - Format flags for the type text.
     */
    getText(enclosingNode?: Node, typeFormatFlags?: TypeFormatFlags): string;
    /**
     * Gets the alias symbol if it exists.
     */
    getAliasSymbol(): Symbol | undefined;
    /**
     * Gets the alias symbol if it exists, or throws.
     */
    getAliasSymbolOrThrow(): Symbol;
    /**
     * Gets the alias type arguments.
     */
    getAliasTypeArguments(): Type[];
    /**
     * Gets the apparent type.
     */
    getApparentType(): Type;
    /**
     * Gets the array element type or throws if it doesn't exist (ex. for `T[]` it would be `T`).
     */
    getArrayElementTypeOrThrow(): Type<ts.Type>;
    /**
     * Gets the array element type or returns undefined if it doesn't exist (ex. for `T[]` it would be `T`).
     */
    getArrayElementType(): Type<ts.Type> | undefined;
    /**
     * Gets the base types.
     */
    getBaseTypes(): Type<ts.BaseType>[];
    /**
     * Gets the base type of a literal type.
     *
     * For example, for a number literal type it will return the number type.
     */
    getBaseTypeOfLiteralType(): Type<ts.Type>;
    /**
     * Gets the call signatures.
     */
    getCallSignatures(): Signature[];
    /**
     * Gets the construct signatures.
     */
    getConstructSignatures(): Signature[];
    /**
     * Gets the constraint or throws if it doesn't exist.
     */
    getConstraintOrThrow(): Type<ts.Type>;
    /**
     * Gets the constraint or returns undefined if it doesn't exist.
     */
    getConstraint(): Type<ts.Type> | undefined;
    /**
     * Gets the default type or throws if it doesn't exist.
     */
    getDefaultOrThrow(): Type<ts.Type>;
    /**
     * Gets the default type or returns undefined if it doesn't exist.
     */
    getDefault(): Type<ts.Type> | undefined;
    /**
     * Gets the properties of the type.
     */
    getProperties(): Symbol[];
    /**
     * Gets a property.
     * @param name - By a name.
     * @param findFunction - Function for searching for a property.
     */
    getProperty(name: string): Symbol | undefined;
    getProperty(findFunction: (declaration: Symbol) => boolean): Symbol | undefined;
    /**
     * Gets the apparent properties of the type.
     */
    getApparentProperties(): Symbol[];
    /**
     * Gets an apparent property.
     * @param name - By a name.
     * @param findFunction - Function for searching for an apparent property.
     */
    getApparentProperty(name: string): Symbol | undefined;
    getApparentProperty(findFunction: (declaration: Symbol) => boolean): Symbol | undefined;
    /**
     * Gets if the type is possibly null or undefined.
     */
    isNullable(): boolean;
    /**
     * Gets the non-nullable type.
     */
    getNonNullableType(): Type;
    /**
     * Gets the number index type.
     */
    getNumberIndexType(): Type | undefined;
    /**
     * Gets the string index type.
     */
    getStringIndexType(): Type | undefined;
    /**
     * Gets the target type of a type reference if it exists.
     */
    getTargetType(): Type<ts.GenericType> | undefined;
    /**
     * Gets the target type of a type reference or throws if it doesn't exist.
     */
    getTargetTypeOrThrow(): Type<ts.GenericType>;
    /**
     * Gets type arguments.
     */
    getTypeArguments(): Type[];
    /**
     * Gets the individual element types of the tuple.
     */
    getTupleElements(): Type[];
    /**
     * Gets the union types (ex. for `T | U` it returns the array `[T, U]`).
     */
    getUnionTypes(): Type[];
    /**
     * Gets the intersection types (ex. for `T & U` it returns the array `[T, U]`).
     */
    getIntersectionTypes(): Type[];
    /**
     * Gets the symbol of the type.
     */
    getSymbol(): Symbol | undefined;
    /**
     * Gets the symbol of the type or throws.
     */
    getSymbolOrThrow(): Symbol;
    /**
     * Gets if this is an anonymous type.
     */
    isAnonymous(): boolean;
    /**
     * Gets if this is an any type.
     */
    isAny(): boolean;
    /**
     * Gets if this is an array type.
     */
    isArray(): boolean;
    /**
     * Gets if this is a boolean type.
     */
    isBoolean(): boolean;
    /**
     * Gets if this is a string type.
     */
    isString(): boolean;
    /**
     * Gets if this is a number type.
     */
    isNumber(): boolean;
    /**
     * Gets if this is a literal type.
     */
    isLiteral(): boolean;
    /**
     * Gets if this is a boolean literal type.
     */
    isBooleanLiteral(): boolean;
    /**
     * Gets if this is an enum literal type.
     */
    isEnumLiteral(): boolean;
    /**
     * Gets if this is a number literal type.
     */
    isNumberLiteral(): boolean;
    /**
     * Gets if this is a string literal type.
     */
    isStringLiteral(): boolean;
    /**
     * Gets if this is a class type.
     */
    isClass(): boolean;
    /**
     * Gets if this is a class or interface type.
     */
    isClassOrInterface(): boolean;
    /**
     * Gets if this is an enum type.
     */
    isEnum(): boolean;
    /**
     * Gets if this is an interface type.
     */
    isInterface(): boolean;
    /**
     * Gets if this is an object type.
     */
    isObject(): boolean;
    /**
     * Gets if this is a type parameter.
     */
    isTypeParameter(): this is TypeParameter;
    /**
     * Gets if this is a tuple type.
     */
    isTuple(): boolean;
    /**
     * Gets if this is a union type.
     */
    isUnion(): boolean;
    /**
     * Gets if this is an intersection type.
     */
    isIntersection(): boolean;
    /**
     * Gets if this is a union or intersection type.
     */
    isUnionOrIntersection(): boolean;
    /**
     * Gets if this is the unknown type.
     */
    isUnknown(): boolean;
    /**
     * Gets if this is the null type.
     */
    isNull(): boolean;
    /**
     * Gets if this is the undefined type.
     */
    isUndefined(): boolean;
    /**
     * Gets the type flags.
     */
    getFlags(): TypeFlags;
    /**
     * Gets the object flags.
     * @remarks Returns 0 for a non-object type.
     */
    getObjectFlags(): ObjectFlags | 0;
}

export declare class TypeParameter extends Type<ts.TypeParameter> {
    /**
     * Gets the constraint or throws if it doesn't exist.
     */
    getConstraintOrThrow(): Type;
    /**
     * Gets the constraint type.
     */
    getConstraint(): Type | undefined;
    /**
     * Gets the default type or throws if it doesn't exist.
     */
    getDefaultOrThrow(): Type;
    /**
     * Gets the default type or undefined if it doesn't exist.
     */
    getDefault(): Type | undefined;
}

export declare class ArgumentError extends BaseError {
    protected constructor();
}

export declare class ArgumentNullOrWhitespaceError extends ArgumentError {
    private constructor();
}

export declare class ArgumentOutOfRangeError extends ArgumentError {
    private constructor();
}

export declare class ArgumentTypeError extends ArgumentError {
    private constructor();
}

export declare abstract class BaseError extends Error {
    readonly message: string;
    protected constructor();
}

export declare class DirectoryNotFoundError extends PathNotFoundError {
    private constructor();
}

export declare class FileNotFoundError extends PathNotFoundError {
    private constructor();
}

export declare class InvalidOperationError extends BaseError {
    private constructor();
}

export declare class NotImplementedError extends BaseError {
    private constructor();
}

export declare class NotSupportedError extends BaseError {
    private constructor();
}

export declare class PathNotFoundError extends BaseError {
    readonly path: string;
    readonly code: "ENOENT";
    protected constructor();
}

/**
 * Holds the compiler options.
 */
export declare class CompilerOptionsContainer extends SettingsContainer<CompilerOptions> {
    constructor();
    /**
     * Sets one or all of the compiler options.
     *
     * WARNING: Setting the compiler options will cause a complete reparse of all the source files.
     * @param settings - Compiler options to set.
     */
    set(settings: Partial<CompilerOptions>): void;
}

/**
 * Kinds of indentation
 */
export declare enum IndentationText {
    /**
     * Two spaces
     */
    TwoSpaces = "  ",
    /**
     * Four spaces
     */
    FourSpaces = "    ",
    /**
     * Eight spaces
     */
    EightSpaces = "        ",
    /**
     * Tab
     */
    Tab = "\t"
}

/**
 * Manipulation settings.
 */
export interface ManipulationSettings extends SupportedFormatCodeSettingsOnly {
    /**
     * Indentation text
     */
    indentationText: IndentationText;
    /**
     * New line kind
     */
    newLineKind: NewLineKind;
    /**
     * Quote type used for string literals.
     */
    quoteKind: QuoteKind;
    /**
     * Whether to enable renaming shorthand property assignments, binding elements,
     * and import & export specifiers without changing behaviour.
     * @remarks Defaults to true.
     * This setting is only available when using TypeScript 3.4+.
     */
    usePrefixAndSuffixTextForRename: boolean;
}

/**
 * FormatCodeSettings that are currently supported in the library.
 */
export interface SupportedFormatCodeSettings extends SupportedFormatCodeSettingsOnly, EditorSettings {
}

/**
 * FormatCodeSettings that are currently supported in the library.
 */
export interface SupportedFormatCodeSettingsOnly {
    /**
     * Whether to insert a space after opening and before closing non-empty braces.
     *
     * ex. `import { Item } from "./Item";` or `import {Item} from "./Item";`
     * @remarks Defaults to true.
     */
    insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: boolean;
}

/**
 * Holds the manipulation settings.
 */
export declare class ManipulationSettingsContainer extends SettingsContainer<ManipulationSettings> {
    private _editorSettings;
    private _formatCodeSettings;
    private _userPreferences;
    constructor();
    /**
     * Gets the editor settings based on the current manipulation settings.
     */
    getEditorSettings(): Readonly<EditorSettings>;
    /**
     * Gets the format code settings.
     */
    getFormatCodeSettings(): Readonly<SupportedFormatCodeSettings>;
    /**
     * Gets the user preferences.
     */
    getUserPreferences(): Readonly<UserPreferences>;
    /**
     * Gets the quote kind used for string literals.
     */
    getQuoteKind(): QuoteKind;
    /**
     * Gets the new line kind.
     */
    getNewLineKind(): NewLineKind;
    /**
     * Gets the new line kind as a string.
     */
    getNewLineKindAsString(): "\n" | "\r\n";
    /**
     * Gets the indentation text.
     */
    getIndentationText(): IndentationText;
    /**
     * Gets whether to use prefix and suffix text when renaming.
     */
    getUsePrefixAndSuffixTextForRename(): boolean;
    /**
     * Sets one or all of the settings.
     * @param settings - Settings to set.
     */
    set(settings: Partial<ManipulationSettings>): void;
}

export declare abstract class SettingsContainer<T extends object> {
    protected constructor();
    /**
     * Resets the settings to the default.
     */
    reset(): void;
    /**
     * Gets a copy of the settings as an object.
     */
    get(): T;
    /**
     * Sets one or all of the settings.
     * @param settings - Settings to set.
     */
    set(settings: Partial<T>): void;
}

export declare type StatementStructures = ClassDeclarationStructure | EnumDeclarationStructure | FunctionDeclarationStructure | InterfaceDeclarationStructure | NamespaceDeclarationStructure | TypeAliasDeclarationStructure | ImportDeclarationStructure | ExportDeclarationStructure | ExportAssignmentStructure | VariableStatementStructure;
export declare type ClassMemberStructures = ConstructorDeclarationStructure | GetAccessorDeclarationStructure | SetAccessorDeclarationStructure | MethodDeclarationStructure | PropertyDeclarationStructure;
export declare type TypeElementMemberStructures = CallSignatureDeclarationStructure | ConstructSignatureDeclarationStructure | IndexSignatureDeclarationStructure | MethodSignatureStructure | PropertySignatureStructure;
export declare type InterfaceMemberStructures = TypeElementMemberStructures;
export declare type ObjectLiteralExpressionPropertyStructures = PropertyAssignmentStructure | ShorthandPropertyAssignmentStructure | SpreadAssignmentStructure | GetAccessorDeclarationStructure | SetAccessorDeclarationStructure | MethodDeclarationStructure;
export declare type JsxStructures = JsxAttributeStructure | JsxSpreadAttributeStructure | JsxElementStructure | JsxSelfClosingElementStructure;
export declare type Structures = StatementStructures | ClassMemberStructures | EnumMemberStructure | InterfaceMemberStructures | ObjectLiteralExpressionPropertyStructures | JsxStructures | FunctionDeclarationOverloadStructure | MethodDeclarationOverloadStructure | ConstructorDeclarationOverloadStructure | ParameterDeclarationStructure | TypeParameterDeclarationStructure | SourceFileStructure | ExportSpecifierStructure | ImportSpecifierStructure | VariableDeclarationStructure | JSDocStructure | DecoratorStructure;

export interface AbstractableNodeStructure {
    isAbstract?: boolean;
}

export interface AmbientableNodeStructure {
    hasDeclareKeyword?: boolean;
}

export interface AsyncableNodeStructure {
    isAsync?: boolean;
}

export interface AwaitableNodeStructure {
    isAwaited?: boolean;
}

export interface DecoratableNodeStructure {
    decorators?: OptionalKind<DecoratorStructure>[];
}

export interface ExclamationTokenableNodeStructure {
    hasExclamationToken?: boolean;
}

export interface ExportableNodeStructure {
    isExported?: boolean;
    isDefaultExport?: boolean;
}

export interface ExtendsClauseableNodeStructure {
    extends?: (string | WriterFunction)[] | WriterFunction;
}

export interface GeneratorableNodeStructure {
    isGenerator?: boolean;
}

export interface ImplementsClauseableNodeStructure {
    implements?: (string | WriterFunction)[] | WriterFunction;
}

export interface InitializerExpressionableNodeStructure {
    initializer?: string | WriterFunction;
}

export interface JSDocableNodeStructure {
    docs?: (OptionalKind<JSDocStructure> | string)[];
}

export interface BindingNamedNodeStructure {
    name: string;
}

export interface NameableNodeStructure {
    name?: string;
}

export interface NamedNodeStructure {
    name: string;
}

export interface PropertyNameableNodeStructure {
    name?: string;
}

export interface PropertyNamedNodeStructure {
    name: string;
}

export interface ParameteredNodeStructure {
    parameters?: OptionalKind<ParameterDeclarationStructure>[];
}

export interface QuestionTokenableNodeStructure {
    hasQuestionToken?: boolean;
}

export interface ReadonlyableNodeStructure {
    isReadonly?: boolean;
}

export interface ReturnTypedNodeStructure {
    returnType?: string | WriterFunction;
}

export interface ScopeableNodeStructure {
    scope?: Scope;
}

export interface ScopedNodeStructure {
    scope?: Scope;
}

export interface SignaturedDeclarationStructure extends ParameteredNodeStructure, ReturnTypedNodeStructure {
}

export interface StaticableNodeStructure {
    isStatic?: boolean;
}

export interface TypedNodeStructure {
    type?: string | WriterFunction;
}

export interface TypeElementMemberedNodeStructure {
    callSignatures?: OptionalKind<CallSignatureDeclarationStructure>[];
    constructSignatures?: OptionalKind<ConstructSignatureDeclarationStructure>[];
    indexSignatures?: OptionalKind<IndexSignatureDeclarationStructure>[];
    methods?: OptionalKind<MethodSignatureStructure>[];
    properties?: OptionalKind<PropertySignatureStructure>[];
}

export interface TypeParameteredNodeStructure {
    typeParameters?: (OptionalKind<TypeParameterDeclarationStructure> | string)[];
}

export interface ClassLikeDeclarationBaseStructure extends NameableNodeStructure, ClassLikeDeclarationBaseSpecificStructure, ImplementsClauseableNodeStructure, DecoratableNodeStructure, TypeParameteredNodeStructure, JSDocableNodeStructure, AbstractableNodeStructure {
}

interface ClassLikeDeclarationBaseSpecificStructure {
    extends?: string | WriterFunction;
    ctors?: OptionalKind<ConstructorDeclarationStructure>[];
    properties?: OptionalKind<PropertyDeclarationStructure>[];
    getAccessors?: OptionalKind<GetAccessorDeclarationStructure>[];
    setAccessors?: OptionalKind<SetAccessorDeclarationStructure>[];
    methods?: OptionalKind<MethodDeclarationStructure>[];
}

export interface ClassDeclarationStructure extends Structure, ClassLikeDeclarationBaseStructure, ClassDeclarationSpecificStructure, AmbientableNodeStructure, ExportableNodeStructure {
    /**
     * The class name.
     * @remarks Can be undefined. For example: `export default class { ... }`
     */
    name?: string;
}

interface ClassDeclarationSpecificStructure extends KindedStructure<StructureKind.Class> {
}

export interface ConstructorDeclarationStructure extends Structure, ConstructorDeclarationSpecificStructure, ScopedNodeStructure, FunctionLikeDeclarationStructure {
}

interface ConstructorDeclarationSpecificStructure extends KindedStructure<StructureKind.Constructor> {
    overloads?: OptionalKind<ConstructorDeclarationOverloadStructure>[];
}

export interface ConstructorDeclarationOverloadStructure extends Structure, ConstructorDeclarationOverloadSpecificStructure, ScopedNodeStructure, SignaturedDeclarationStructure, TypeParameteredNodeStructure, JSDocableNodeStructure {
}

interface ConstructorDeclarationOverloadSpecificStructure extends KindedStructure<StructureKind.ConstructorOverload> {
}

export interface GetAccessorDeclarationStructure extends Structure, GetAccessorDeclarationSpecificStructure, PropertyNamedNodeStructure, StaticableNodeStructure, DecoratableNodeStructure, AbstractableNodeStructure, ScopedNodeStructure, FunctionLikeDeclarationStructure {
}

interface GetAccessorDeclarationSpecificStructure extends KindedStructure<StructureKind.GetAccessor> {
}

export interface MethodDeclarationStructure extends Structure, MethodDeclarationSpecificStructure, PropertyNamedNodeStructure, StaticableNodeStructure, DecoratableNodeStructure, AbstractableNodeStructure, ScopedNodeStructure, AsyncableNodeStructure, GeneratorableNodeStructure, FunctionLikeDeclarationStructure, QuestionTokenableNodeStructure {
}

interface MethodDeclarationSpecificStructure extends KindedStructure<StructureKind.Method> {
    overloads?: OptionalKind<MethodDeclarationOverloadStructure>[];
}

export interface MethodDeclarationOverloadStructure extends Structure, MethodDeclarationOverloadSpecificStructure, StaticableNodeStructure, AbstractableNodeStructure, ScopedNodeStructure, AsyncableNodeStructure, GeneratorableNodeStructure, SignaturedDeclarationStructure, TypeParameteredNodeStructure, JSDocableNodeStructure, QuestionTokenableNodeStructure {
}

interface MethodDeclarationOverloadSpecificStructure extends KindedStructure<StructureKind.MethodOverload> {
}

export interface PropertyDeclarationStructure extends Structure, PropertyDeclarationSpecificStructure, PropertyNamedNodeStructure, TypedNodeStructure, QuestionTokenableNodeStructure, ExclamationTokenableNodeStructure, StaticableNodeStructure, ScopedNodeStructure, JSDocableNodeStructure, ReadonlyableNodeStructure, InitializerExpressionableNodeStructure, DecoratableNodeStructure, AbstractableNodeStructure {
}

interface PropertyDeclarationSpecificStructure extends KindedStructure<StructureKind.Property> {
}

export interface SetAccessorDeclarationStructure extends Structure, SetAccessorDeclarationSpecificStructure, PropertyNamedNodeStructure, StaticableNodeStructure, DecoratableNodeStructure, AbstractableNodeStructure, ScopedNodeStructure, FunctionLikeDeclarationStructure {
}

interface SetAccessorDeclarationSpecificStructure extends KindedStructure<StructureKind.SetAccessor> {
}

export interface DecoratorStructure extends Structure, DecoratorSpecificStructure {
}

interface DecoratorSpecificStructure extends KindedStructure<StructureKind.Decorator> {
    name: string;
    /**
     * Arguments for a decorator factory.
     * @remarks Provide an empty array to make the structure a decorator factory.
     */
    arguments?: (string | WriterFunction)[] | WriterFunction;
    typeArguments?: string[];
}

export interface JSDocStructure extends Structure, JSDocSpecificStructure {
}

interface JSDocSpecificStructure extends KindedStructure<StructureKind.JSDoc> {
    description: string | WriterFunction;
}

export interface ExpressionedNodeStructure {
    expression: string | WriterFunction;
}

export interface PropertyAssignmentStructure extends Structure, PropertyAssignmentSpecificStructure, PropertyNamedNodeStructure {
}

interface PropertyAssignmentSpecificStructure extends KindedStructure<StructureKind.PropertyAssignment> {
    initializer: string | WriterFunction;
}

export interface ShorthandPropertyAssignmentStructure extends Structure, ShorthandPropertyAssignmentSpecificStructure, NamedNodeStructure {
}

interface ShorthandPropertyAssignmentSpecificStructure extends KindedStructure<StructureKind.ShorthandPropertyAssignment> {
}

export interface SpreadAssignmentStructure extends Structure, SpreadAssignmentSpecificStructure, ExpressionedNodeStructure {
}

interface SpreadAssignmentSpecificStructure extends KindedStructure<StructureKind.SpreadAssignment> {
}

export interface EnumDeclarationStructure extends Structure, NamedNodeStructure, EnumDeclarationSpecificStructure, JSDocableNodeStructure, AmbientableNodeStructure, ExportableNodeStructure {
}

interface EnumDeclarationSpecificStructure extends KindedStructure<StructureKind.Enum> {
    isConst?: boolean;
    members?: OptionalKind<EnumMemberStructure>[];
}

export interface EnumMemberStructure extends Structure, EnumMemberSpecificStructure, PropertyNamedNodeStructure, JSDocableNodeStructure, InitializerExpressionableNodeStructure {
}

interface EnumMemberSpecificStructure extends KindedStructure<StructureKind.EnumMember> {
    /**
     * Convenience property for setting the initializer.
     */
    value?: number | string;
}

export interface FunctionDeclarationStructure extends Structure, FunctionDeclarationSpecificStructure, NameableNodeStructure, FunctionLikeDeclarationStructure, AsyncableNodeStructure, GeneratorableNodeStructure, AmbientableNodeStructure, ExportableNodeStructure {
}

interface FunctionDeclarationSpecificStructure extends KindedStructure<StructureKind.Function> {
    overloads?: OptionalKind<FunctionDeclarationOverloadStructure>[];
}

export interface FunctionDeclarationOverloadStructure extends Structure, FunctionDeclarationOverloadSpecificStructure, SignaturedDeclarationStructure, TypeParameteredNodeStructure, JSDocableNodeStructure, AsyncableNodeStructure, GeneratorableNodeStructure, AmbientableNodeStructure, ExportableNodeStructure {
}

interface FunctionDeclarationOverloadSpecificStructure extends KindedStructure<StructureKind.FunctionOverload> {
}

export interface FunctionLikeDeclarationStructure extends SignaturedDeclarationStructure, TypeParameteredNodeStructure, JSDocableNodeStructure, StatementedNodeStructure {
}

export interface ParameterDeclarationStructure extends Structure, BindingNamedNodeStructure, TypedNodeStructure, ReadonlyableNodeStructure, DecoratableNodeStructure, QuestionTokenableNodeStructure, ScopeableNodeStructure, InitializerExpressionableNodeStructure, ParameterDeclarationSpecificStructure {
}

interface ParameterDeclarationSpecificStructure extends KindedStructure<StructureKind.Parameter> {
    isRestParameter?: boolean;
}

export interface CallSignatureDeclarationStructure extends Structure, CallSignatureDeclarationSpecificStructure, JSDocableNodeStructure, SignaturedDeclarationStructure, TypeParameteredNodeStructure {
}

interface CallSignatureDeclarationSpecificStructure extends KindedStructure<StructureKind.CallSignature> {
}

export interface ConstructSignatureDeclarationStructure extends Structure, ConstructSignatureDeclarationSpecificStructure, JSDocableNodeStructure, SignaturedDeclarationStructure, TypeParameteredNodeStructure {
}

interface ConstructSignatureDeclarationSpecificStructure extends KindedStructure<StructureKind.ConstructSignature> {
}

export interface IndexSignatureDeclarationStructure extends Structure, IndexSignatureDeclarationSpecificStructure, JSDocableNodeStructure, ReadonlyableNodeStructure, ReturnTypedNodeStructure {
}

interface IndexSignatureDeclarationSpecificStructure extends KindedStructure<StructureKind.IndexSignature> {
    keyName?: string;
    keyType?: string;
}

export interface InterfaceDeclarationStructure extends Structure, NamedNodeStructure, InterfaceDeclarationSpecificStructure, ExtendsClauseableNodeStructure, TypeParameteredNodeStructure, JSDocableNodeStructure, AmbientableNodeStructure, ExportableNodeStructure, TypeElementMemberedNodeStructure {
}

interface InterfaceDeclarationSpecificStructure extends KindedStructure<StructureKind.Interface> {
}

export interface MethodSignatureStructure extends Structure, PropertyNamedNodeStructure, MethodSignatureSpecificStructure, QuestionTokenableNodeStructure, JSDocableNodeStructure, SignaturedDeclarationStructure, TypeParameteredNodeStructure {
}

interface MethodSignatureSpecificStructure extends KindedStructure<StructureKind.MethodSignature> {
}

export interface PropertySignatureStructure extends Structure, PropertySignatureSpecificStructure, PropertyNamedNodeStructure, TypedNodeStructure, QuestionTokenableNodeStructure, JSDocableNodeStructure, ReadonlyableNodeStructure, InitializerExpressionableNodeStructure {
}

interface PropertySignatureSpecificStructure extends KindedStructure<StructureKind.PropertySignature> {
}

export interface JsxAttributedNodeStructure {
    attributes?: (OptionalKind<JsxAttributeStructure> | JsxSpreadAttributeStructure)[];
}

export interface JsxTagNamedNodeStructure {
    name: string;
}

export interface JsxAttributeStructure extends Structure, JsxAttributeSpecificStructure, NamedNodeStructure {
}

interface JsxAttributeSpecificStructure extends KindedStructure<StructureKind.JsxAttribute> {
    initializer?: string;
}

export interface JsxElementStructure extends Structure, JsxElementSpecificStructure {
}

interface JsxElementSpecificStructure extends KindedStructure<StructureKind.JsxElement> {
    name: string;
    attributes?: (OptionalKind<JsxAttributeStructure> | JsxSpreadAttributeStructure)[];
    children?: (OptionalKind<JsxElementStructure> | JsxSelfClosingElementStructure)[];
    bodyText?: string;
}

export interface JsxSelfClosingElementStructure extends Structure, JsxTagNamedNodeStructure, JsxSelfClosingElementSpecificStructure, JsxAttributedNodeStructure {
}

interface JsxSelfClosingElementSpecificStructure extends KindedStructure<StructureKind.JsxSelfClosingElement> {
}

export interface JsxSpreadAttributeStructure extends Structure, JsxSpreadAttributeSpecificStructure {
}

interface JsxSpreadAttributeSpecificStructure extends KindedStructure<StructureKind.JsxSpreadAttribute> {
    expression: string;
}

export interface ExportAssignmentStructure extends Structure, ExportAssignmentSpecificStructure {
}

interface ExportAssignmentSpecificStructure extends KindedStructure<StructureKind.ExportAssignment> {
    isExportEquals?: boolean;
    expression: string | WriterFunction;
}

export interface ExportDeclarationStructure extends Structure, ExportDeclarationSpecificStructure {
}

interface ExportDeclarationSpecificStructure extends KindedStructure<StructureKind.ExportDeclaration> {
    namedExports?: (string | OptionalKind<ExportSpecifierStructure> | WriterFunction)[] | WriterFunction;
    moduleSpecifier?: string;
}

export interface ExportSpecifierStructure extends Structure, ExportSpecifierSpecificStructure {
}

interface ExportSpecifierSpecificStructure extends KindedStructure<StructureKind.ExportSpecifier> {
    name: string;
    alias?: string;
}

export interface ImportDeclarationStructure extends Structure, ImportDeclarationSpecificStructure {
}

interface ImportDeclarationSpecificStructure extends KindedStructure<StructureKind.ImportDeclaration> {
    defaultImport?: string;
    namespaceImport?: string;
    namedImports?: (OptionalKind<ImportSpecifierStructure> | string | WriterFunction)[] | WriterFunction;
    moduleSpecifier: string;
}

export interface ImportSpecifierStructure extends Structure, ImportSpecifierSpecificStructure {
}

interface ImportSpecifierSpecificStructure extends KindedStructure<StructureKind.ImportSpecifier> {
    name: string;
    alias?: string;
}

export interface NamespaceDeclarationStructure extends Structure, NamedNodeStructure, NamespaceDeclarationSpecificStructure, JSDocableNodeStructure, AmbientableNodeStructure, ExportableNodeStructure, StatementedNodeStructure {
}

interface NamespaceDeclarationSpecificStructure extends KindedStructure<StructureKind.Namespace> {
    /**
     * The namespace declaration kind.
     *
     * @remarks Defaults to "namespace".
     */
    declarationKind?: NamespaceDeclarationKind;
}

export interface SourceFileStructure extends Structure, SourceFileSpecificStructure, StatementedNodeStructure {
}

interface SourceFileSpecificStructure {
    kind: StructureKind.SourceFile;
}

export interface StatementedNodeStructure {
    statements?: (string | WriterFunction | StatementStructures)[] | string | WriterFunction;
}

export interface VariableDeclarationStructure extends Structure, VariableDeclarationSpecificStructure, BindingNamedNodeStructure, InitializerExpressionableNodeStructure, TypedNodeStructure, ExclamationTokenableNodeStructure {
}

interface VariableDeclarationSpecificStructure extends KindedStructure<StructureKind.VariableDeclaration> {
}

export interface VariableStatementStructure extends Structure, VariableStatementSpecificStructure, JSDocableNodeStructure, AmbientableNodeStructure, ExportableNodeStructure {
}

interface VariableStatementSpecificStructure extends KindedStructure<StructureKind.VariableStatement> {
    declarationKind?: VariableDeclarationKind;
    declarations: OptionalKind<VariableDeclarationStructure>[];
}

export interface TypeAliasDeclarationStructure extends Structure, TypeAliasDeclarationSpecificStructure, NamedNodeStructure, TypedNodeStructure, TypeParameteredNodeStructure, JSDocableNodeStructure, AmbientableNodeStructure, ExportableNodeStructure {
    type: string | WriterFunction;
}

interface TypeAliasDeclarationSpecificStructure extends KindedStructure<StructureKind.TypeAlias> {
    type: string | WriterFunction;
}

export interface TypeParameterDeclarationStructure extends Structure, TypeParameterDeclarationSpecificStructure, NamedNodeStructure {
}

interface TypeParameterDeclarationSpecificStructure extends KindedStructure<StructureKind.TypeParameter> {
    constraint?: string | WriterFunction;
    default?: string | WriterFunction;
}

/**
 * Iterates over the elements in the provided array.
 * @param structures - Array of structures to iterate over.
 * @param callback - Callback to do on each element in the array. Returning a truthy value will return that value in the main function call.
 */
export declare function forEachStructureChild<TStructure>(structures: ReadonlyArray<Structures>, callback: (child: Structures) => TStructure | void): TStructure | undefined;
/**
 * Iterates over the children of the provided array.
 * @remarks If the children do not have a `kind` property, it will be automatically added.
 * @param structure - Structure to iterate over.
 * @param callback - Callback to do on each child of the provided structure. Returning a truthy value will return that value in the main function call.
 */
export declare function forEachStructureChild<TStructure>(structure: Structures, callback: (child: Structures) => TStructure | void): TStructure | undefined;

/**
 * Type guards for use on structures.
 */
export declare class StructureTypeGuards {
    private constructor();
    /**
     * Gets if the provided structure has a name.
     */
    static hasName<T extends Structure>(structure: T): structure is T & {
            name: string;
        };
    /**
     * Gets if the provided structure is a ClassDeclarationStructure.
     */
    static isClass(structure: Structure & {
            kind: StructureKind;
        }): structure is ClassDeclarationStructure;
    /**
     * Gets if the provided structure is a ClassLikeDeclarationBaseStructure.
     */
    static isClassLikeDeclarationBase<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & ClassLikeDeclarationBaseStructure;
    /**
     * Gets if the provided structure is a NameableNodeStructure.
     */
    static isNameable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & NameableNodeStructure;
    /**
     * Gets if the provided structure is a ImplementsClauseableNodeStructure.
     */
    static isImplementsClauseable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & ImplementsClauseableNodeStructure;
    /**
     * Gets if the provided structure is a DecoratableNodeStructure.
     */
    static isDecoratable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & DecoratableNodeStructure;
    /**
     * Gets if the provided structure is a TypeParameteredNodeStructure.
     */
    static isTypeParametered<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & TypeParameteredNodeStructure;
    /**
     * Gets if the provided structure is a JSDocableNodeStructure.
     */
    static isJSDocable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & JSDocableNodeStructure;
    /**
     * Gets if the provided structure is a AbstractableNodeStructure.
     */
    static isAbstractable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & AbstractableNodeStructure;
    /**
     * Gets if the provided structure is a AmbientableNodeStructure.
     */
    static isAmbientable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & AmbientableNodeStructure;
    /**
     * Gets if the provided structure is a ExportableNodeStructure.
     */
    static isExportable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & ExportableNodeStructure;
    /**
     * Gets if the provided structure is a ConstructorDeclarationStructure.
     */
    static isConstructor(structure: Structure & {
            kind: StructureKind;
        }): structure is ConstructorDeclarationStructure;
    /**
     * Gets if the provided structure is a ScopedNodeStructure.
     */
    static isScoped<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & ScopedNodeStructure;
    /**
     * Gets if the provided structure is a FunctionLikeDeclarationStructure.
     */
    static isFunctionLike<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & FunctionLikeDeclarationStructure;
    /**
     * Gets if the provided structure is a SignaturedDeclarationStructure.
     */
    static isSignatured<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & SignaturedDeclarationStructure;
    /**
     * Gets if the provided structure is a ParameteredNodeStructure.
     */
    static isParametered<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & ParameteredNodeStructure;
    /**
     * Gets if the provided structure is a ReturnTypedNodeStructure.
     */
    static isReturnTyped<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & ReturnTypedNodeStructure;
    /**
     * Gets if the provided structure is a StatementedNodeStructure.
     */
    static isStatemented<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & StatementedNodeStructure;
    /**
     * Gets if the provided structure is a ConstructorDeclarationOverloadStructure.
     */
    static isConstructorDeclarationOverload(structure: Structure & {
            kind: StructureKind;
        }): structure is ConstructorDeclarationOverloadStructure;
    /**
     * Gets if the provided structure is a GetAccessorDeclarationStructure.
     */
    static isGetAccessor(structure: Structure & {
            kind: StructureKind;
        }): structure is GetAccessorDeclarationStructure;
    /**
     * Gets if the provided structure is a PropertyNamedNodeStructure.
     */
    static isPropertyNamed<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & PropertyNamedNodeStructure;
    /**
     * Gets if the provided structure is a StaticableNodeStructure.
     */
    static isStaticable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & StaticableNodeStructure;
    /**
     * Gets if the provided structure is a MethodDeclarationStructure.
     */
    static isMethod(structure: Structure & {
            kind: StructureKind;
        }): structure is MethodDeclarationStructure;
    /**
     * Gets if the provided structure is a AsyncableNodeStructure.
     */
    static isAsyncable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & AsyncableNodeStructure;
    /**
     * Gets if the provided structure is a GeneratorableNodeStructure.
     */
    static isGeneratorable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & GeneratorableNodeStructure;
    /**
     * Gets if the provided structure is a QuestionTokenableNodeStructure.
     */
    static isQuestionTokenable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & QuestionTokenableNodeStructure;
    /**
     * Gets if the provided structure is a MethodDeclarationOverloadStructure.
     */
    static isMethodDeclarationOverload(structure: Structure & {
            kind: StructureKind;
        }): structure is MethodDeclarationOverloadStructure;
    /**
     * Gets if the provided structure is a PropertyDeclarationStructure.
     */
    static isProperty(structure: Structure & {
            kind: StructureKind;
        }): structure is PropertyDeclarationStructure;
    /**
     * Gets if the provided structure is a TypedNodeStructure.
     */
    static isTyped<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & TypedNodeStructure;
    /**
     * Gets if the provided structure is a ExclamationTokenableNodeStructure.
     */
    static isExclamationTokenable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & ExclamationTokenableNodeStructure;
    /**
     * Gets if the provided structure is a ReadonlyableNodeStructure.
     */
    static isReadonlyable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & ReadonlyableNodeStructure;
    /**
     * Gets if the provided structure is a InitializerExpressionableNodeStructure.
     */
    static isInitializerExpressionable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & InitializerExpressionableNodeStructure;
    /**
     * Gets if the provided structure is a SetAccessorDeclarationStructure.
     */
    static isSetAccessor(structure: Structure & {
            kind: StructureKind;
        }): structure is SetAccessorDeclarationStructure;
    /**
     * Gets if the provided structure is a DecoratorStructure.
     */
    static isDecorator(structure: Structure & {
            kind: StructureKind;
        }): structure is DecoratorStructure;
    /**
     * Gets if the provided structure is a JSDocStructure.
     */
    static isJSDoc(structure: Structure & {
            kind: StructureKind;
        }): structure is JSDocStructure;
    /**
     * Gets if the provided structure is a EnumDeclarationStructure.
     */
    static isEnum(structure: Structure & {
            kind: StructureKind;
        }): structure is EnumDeclarationStructure;
    /**
     * Gets if the provided structure is a NamedNodeStructure.
     */
    static isNamed<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & NamedNodeStructure;
    /**
     * Gets if the provided structure is a EnumMemberStructure.
     */
    static isEnumMember(structure: Structure & {
            kind: StructureKind;
        }): structure is EnumMemberStructure;
    /**
     * Gets if the provided structure is a FunctionDeclarationStructure.
     */
    static isFunction(structure: Structure & {
            kind: StructureKind;
        }): structure is FunctionDeclarationStructure;
    /**
     * Gets if the provided structure is a FunctionDeclarationOverloadStructure.
     */
    static isFunctionDeclarationOverload(structure: Structure & {
            kind: StructureKind;
        }): structure is FunctionDeclarationOverloadStructure;
    /**
     * Gets if the provided structure is a ParameterDeclarationStructure.
     */
    static isParameter(structure: Structure & {
            kind: StructureKind;
        }): structure is ParameterDeclarationStructure;
    /**
     * Gets if the provided structure is a BindingNamedNodeStructure.
     */
    static isBindingNamed<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & BindingNamedNodeStructure;
    /**
     * Gets if the provided structure is a ScopeableNodeStructure.
     */
    static isScopeable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & ScopeableNodeStructure;
    /**
     * Gets if the provided structure is a CallSignatureDeclarationStructure.
     */
    static isCallSignature(structure: Structure & {
            kind: StructureKind;
        }): structure is CallSignatureDeclarationStructure;
    /**
     * Gets if the provided structure is a ConstructSignatureDeclarationStructure.
     */
    static isConstructSignature(structure: Structure & {
            kind: StructureKind;
        }): structure is ConstructSignatureDeclarationStructure;
    /**
     * Gets if the provided structure is a IndexSignatureDeclarationStructure.
     */
    static isIndexSignature(structure: Structure & {
            kind: StructureKind;
        }): structure is IndexSignatureDeclarationStructure;
    /**
     * Gets if the provided structure is a InterfaceDeclarationStructure.
     */
    static isInterface(structure: Structure & {
            kind: StructureKind;
        }): structure is InterfaceDeclarationStructure;
    /**
     * Gets if the provided structure is a ExtendsClauseableNodeStructure.
     */
    static isExtendsClauseable<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & ExtendsClauseableNodeStructure;
    /**
     * Gets if the provided structure is a TypeElementMemberedNodeStructure.
     */
    static isTypeElementMembered<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & TypeElementMemberedNodeStructure;
    /**
     * Gets if the provided structure is a MethodSignatureStructure.
     */
    static isMethodSignature(structure: Structure & {
            kind: StructureKind;
        }): structure is MethodSignatureStructure;
    /**
     * Gets if the provided structure is a PropertySignatureStructure.
     */
    static isPropertySignature(structure: Structure & {
            kind: StructureKind;
        }): structure is PropertySignatureStructure;
    /**
     * Gets if the provided structure is a JsxAttributeStructure.
     */
    static isJsxAttribute(structure: Structure & {
            kind: StructureKind;
        }): structure is JsxAttributeStructure;
    /**
     * Gets if the provided structure is a JsxElementStructure.
     */
    static isJsxElement(structure: Structure & {
            kind: StructureKind;
        }): structure is JsxElementStructure;
    /**
     * Gets if the provided structure is a JsxSelfClosingElementStructure.
     */
    static isJsxSelfClosingElement(structure: Structure & {
            kind: StructureKind;
        }): structure is JsxSelfClosingElementStructure;
    /**
     * Gets if the provided structure is a JsxTagNamedNodeStructure.
     */
    static isJsxTagNamed<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & JsxTagNamedNodeStructure;
    /**
     * Gets if the provided structure is a JsxAttributedNodeStructure.
     */
    static isJsxAttributed<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & JsxAttributedNodeStructure;
    /**
     * Gets if the provided structure is a JsxSpreadAttributeStructure.
     */
    static isJsxSpreadAttribute(structure: Structure & {
            kind: StructureKind;
        }): structure is JsxSpreadAttributeStructure;
    /**
     * Gets if the provided structure is a ExportAssignmentStructure.
     */
    static isExportAssignment(structure: Structure & {
            kind: StructureKind;
        }): structure is ExportAssignmentStructure;
    /**
     * Gets if the provided structure is a ExportDeclarationStructure.
     */
    static isExportDeclaration(structure: Structure & {
            kind: StructureKind;
        }): structure is ExportDeclarationStructure;
    /**
     * Gets if the provided structure is a ExportSpecifierStructure.
     */
    static isExportSpecifier(structure: Structure & {
            kind: StructureKind;
        }): structure is ExportSpecifierStructure;
    /**
     * Gets if the provided structure is a ImportDeclarationStructure.
     */
    static isImportDeclaration(structure: Structure & {
            kind: StructureKind;
        }): structure is ImportDeclarationStructure;
    /**
     * Gets if the provided structure is a ImportSpecifierStructure.
     */
    static isImportSpecifier(structure: Structure & {
            kind: StructureKind;
        }): structure is ImportSpecifierStructure;
    /**
     * Gets if the provided structure is a NamespaceDeclarationStructure.
     */
    static isNamespace(structure: Structure & {
            kind: StructureKind;
        }): structure is NamespaceDeclarationStructure;
    /**
     * Gets if the provided structure is a SourceFileStructure.
     */
    static isSourceFile(structure: Structure & {
            kind: StructureKind;
        }): structure is SourceFileStructure;
    /**
     * Gets if the provided structure is a VariableDeclarationStructure.
     */
    static isVariableDeclaration(structure: Structure & {
            kind: StructureKind;
        }): structure is VariableDeclarationStructure;
    /**
     * Gets if the provided structure is a VariableStatementStructure.
     */
    static isVariableStatement(structure: Structure & {
            kind: StructureKind;
        }): structure is VariableStatementStructure;
    /**
     * Gets if the provided structure is a TypeAliasDeclarationStructure.
     */
    static isTypeAlias(structure: Structure & {
            kind: StructureKind;
        }): structure is TypeAliasDeclarationStructure;
    /**
     * Gets if the provided structure is a TypeParameterDeclarationStructure.
     */
    static isTypeParameter(structure: Structure & {
            kind: StructureKind;
        }): structure is TypeParameterDeclarationStructure;
    /**
     * Gets if the provided structure is a PropertyAssignmentStructure.
     */
    static isPropertyAssignment(structure: Structure & {
            kind: StructureKind;
        }): structure is PropertyAssignmentStructure;
    /**
     * Gets if the provided structure is a ShorthandPropertyAssignmentStructure.
     */
    static isShorthandPropertyAssignment(structure: Structure & {
            kind: StructureKind;
        }): structure is ShorthandPropertyAssignmentStructure;
    /**
     * Gets if the provided structure is a SpreadAssignmentStructure.
     */
    static isSpreadAssignment(structure: Structure & {
            kind: StructureKind;
        }): structure is SpreadAssignmentStructure;
    /**
     * Gets if the provided structure is a ExpressionedNodeStructure.
     */
    static isExpressioned<T extends Structure & {
        kind: StructureKind;
        }>(structure: T): structure is T & ExpressionedNodeStructure;
}

export interface Structure {
    /**
     * Leading comments or whitespace.
     */
    leadingTrivia?: string | WriterFunction | (string | WriterFunction)[];
    /**
     * Trailing comments or whitespace.
     */
    trailingTrivia?: string | WriterFunction | (string | WriterFunction)[];
}

export interface KindedStructure<TKind extends StructureKind> {
    kind: TKind;
}

export declare enum StructureKind {
    CallSignature = 0,
    Class = 1,
    ConstructSignature = 2,
    Constructor = 3,
    ConstructorOverload = 4,
    Decorator = 5,
    Enum = 6,
    EnumMember = 7,
    ExportAssignment = 8,
    ExportDeclaration = 9,
    ExportSpecifier = 10,
    Function = 11,
    FunctionOverload = 12,
    GetAccessor = 13,
    ImportDeclaration = 14,
    ImportSpecifier = 15,
    IndexSignature = 16,
    Interface = 17,
    JsxAttribute = 18,
    JsxSpreadAttribute = 19,
    JsxElement = 20,
    JsxSelfClosingElement = 21,
    JSDoc = 22,
    Method = 23,
    MethodOverload = 24,
    MethodSignature = 25,
    Namespace = 26,
    Parameter = 27,
    Property = 28,
    PropertyAssignment = 29,
    PropertySignature = 30,
    SetAccessor = 31,
    ShorthandPropertyAssignment = 32,
    SourceFile = 33,
    SpreadAssignment = 34,
    TypeAlias = 35,
    TypeParameter = 36,
    VariableDeclaration = 37,
    VariableStatement = 38
}

export declare type OptionalKind<TStructure extends {
    kind?: StructureKind;
    }> = Pick<TStructure, Exclude<keyof TStructure, "kind">> & Partial<Pick<TStructure, "kind">>;
export { ts, SyntaxKind, CompilerOptions, EmitHint, ScriptKind, NewLineKind, LanguageVariant, ScriptTarget, TypeFlags, ObjectFlags, SymbolFlags, TypeFormatFlags, DiagnosticCategory, EditorSettings, ModuleResolutionKind };
export * from "./code-block-writer";
