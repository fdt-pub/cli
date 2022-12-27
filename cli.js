// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const deploy = ()=>console.log("deploy");
Deno.env.set("FDT_CONTEXT", "example123");
deploy();
