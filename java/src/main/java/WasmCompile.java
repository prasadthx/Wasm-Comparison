import java.io.File;
import java.net.URL;

import de.inetsoftware.jwebassembly.JWebAssembly;

public class WasmCompile {
    public static void main(String[] args) {
        File wasmFile = new File("./javaCode.wasm");
        JWebAssembly wasm = new JWebAssembly();
        Class codeClass = JavaCode.class;

        URL url = codeClass.getResource(
                '/' +
                        codeClass.getName().replace( '.', '/' ) +
                        ".class" );
        wasm.addFile( url );
        wasm.compileToBinary( wasmFile );
    }
}
