import React, { useState } from "react";
import Draggable from "react-draggable";

const DividedDiv = () => {
  const [linePos, setLinePos] = useState(300);

  const handleDrag = (event: any, ui: any) => {
    setLinePos(ui.x);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "80vh",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: `${linePos}px`,
          height: "100%",
          backgroundColor: "pink",
        }}
      >
        <div style={{ minWidth: "1000px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          rhoncus, nisl ac suscipit dictum, elit enim cursus magna, nec aliquet
          sapien sem eu dolor. Fusce odio enim, laoreet sit amet maximus eget,
          rhoncus ut est. Curabitur finibus mi sit amet turpis viverra, at
          maximus purus mattis. Mauris lobortis maximus arcu sed rutrum.
          Phasellus molestie lacus sit amet risus facilisis molestie. Maecenas
          tempor dui at risus porttitor commodo. Etiam quis neque at massa
          sodales bibendum eu eget ligula. Morbi venenatis volutpat tellus,
          scelerisque fermentum lectus ultrices non. Aliquam eu purus in ante
          pharetra accumsan. Aliquam eu odio sem. Proin sem diam, malesuada eu
          nisi in, dignissim bibendum tellus. Ut rhoncus sem vitae enim blandit
          ultricies. Donec eu tristique arcu. Nullam nisi ipsum, lobortis vitae
          mauris eu, dapibus dapibus tellus. Etiam interdum suscipit nibh a
          pharetra. Morbi quis lectus quis orci molestie mollis at interdum
          quam. Vestibulum sit amet consectetur tortor. Sed eget urna eu nulla
          cursus cursus sit amet vel dui. Vivamus vel leo pretium mauris blandit
          egestas id vitae ligula. Nulla facilisi. Etiam massa sapien, tempor
          sed diam sed, dignissim fringilla leo. Donec fringilla, turpis et
          auctor aliquam, mauris nunc hendrerit diam, id condimentum urna massa
          eu mi. Phasellus facilisis sodales sapien. Ut molestie sagittis lacus
          in elementum. Donec ac sem consectetur, imperdiet lectus ac,
          pellentesque sapien. Sed eu massa accumsan, suscipit dolor et, varius
          ipsum. Donec eleifend sagittis lectus, eu finibus nisl facilisis eget.
          Nam laoreet tortor eleifend, blandit sapien at, aliquam risus. Etiam
          lectus diam, consequat at dignissim at, posuere eu leo. Nulla commodo
          nisl a sem finibus, molestie pulvinar dolor scelerisque. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Morbi interdum mauris enim, commodo consectetur orci
          bibendum sit amet. Suspendisse eget molestie nisi. Maecenas aliquam
          mauris neque, nec fringilla augue sagittis vitae. Cras ut tellus
          dapibus, cursus leo at, imperdiet nulla. Nulla eget ex non diam
          hendrerit rhoncus ac nec dolor. Maecenas imperdiet nec ex hendrerit
          feugiat. Proin fermentum massa magna, ut maximus ipsum vulputate vel.
          Sed lacinia tellus id risus ultricies ultrices. Proin eget tincidunt
          mi. Nam vitae leo in enim tincidunt vulputate vitae eu orci. Donec
          blandit dui justo. Integer blandit gravida velit, quis cursus sem
          vehicula at. Suspendisse potenti. Vestibulum elementum ultricies
          iaculis. Vivamus tempor pellentesque gravida. Fusce felis nulla,
          rhoncus vitae blandit elementum, tincidunt ac magna. Maecenas
          condimentum vel quam eu suscipit. Maecenas sollicitudin convallis
          scelerisque. Sed id pharetra est. Maecenas odio felis, aliquet id
          cursus eu, sodales ut tortor. Nunc id dolor tempor, pellentesque purus
          vitae, volutpat massa. Cras aliquet eu elit at vehicula. Vestibulum
          sed nisl ipsum. Duis pharetra at augue at pharetra. Etiam lectus enim,
          suscipit id ex at, mattis vestibulum turpis. Proin sollicitudin nisl
          tortor. Aenean quis maximus sapien. Cras eget hendrerit ex. Nam nibh
          lacus, ornare id magna eget, lobortis viverra urna. Quisque sodales
          ullamcorper metus et rhoncus. Praesent congue in neque id dignissim.
          In hac habitasse platea dictumst. Curabitur bibendum cursus sapien, id
          tempus libero ultricies in. Nam et ex neque. Suspendisse vel nibh
          tristique, tempus massa eget, viverra libero. Nunc eget ligula at
          mauris dignissim eleifend ut faucibus urna. Proin enim lorem
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: `${linePos}px`,
          width: `calc(100% - ${linePos}px)`,
          height: "100%",
          backgroundColor: "green",
        }}
      >
        <div style={{ minWidth: "1000px" }}>
          Where does it come from? Contrary to popular belief, Lorem Ipsum is
          not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. The standard chunk of
          Lorem Ipsum used since the 1500s is reproduced below for those
          interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
          Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H.
          Rackham.
        </div>
      </div>
      <Draggable
        axis="x"
        bounds="parent"
        onDrag={handleDrag}
        position={{ x: linePos, y: 0 }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "8px",
            height: "100%",
            backgroundColor: "#333",
            cursor: "col-resize",
          }}
        ></div>
      </Draggable>
    </div>
  );
};

export default DividedDiv;
