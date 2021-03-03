import React, { Component } from "react";
import { Button } from "reactstrap";
import LoadingModal from "../elements/LoadingModal";
import InfoModal from "../elements/InfoModal";
import LoadingScreenOverlay from "../elements/LoadingScreenOverlay";

class Test extends Component {
  constructor() {
    super();
    this.state = {
      isLoadingModalOpen: false,
    };
  }

  toggleLoadingModal = () => {
    this.state.isLoadingModalOpen
      ? this.setState({ isLoadingModalOpen: false })
      : this.setState({ isLoadingModalOpen: true });
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggleLoadingModal}>Click</Button>
        <InfoModal
          isOpen={this.state.isLoadingModalOpen}
          toggle={this.toggleLoadingModal}
          title="Hello"
          body="Thi"
        />
        <LoadingScreenOverlay/>
        <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis maxime magni, eos velit nulla fugit. Officiis quas consequatur perferendis eum illo esse id officia, magni magnam obcaecati, ut sint provident iste ad eligendi quis animi temporibus aspernatur. Nisi non sed nesciunt labore soluta repellat laudantium dignissimos illum quasi corrupti illo sunt consectetur reprehenderit beatae molestias, voluptatibus quod eos ad eum hic fuga explicabo voluptate ut. Blanditiis culpa dolor quibusdam mollitia. Libero debitis perspiciatis corrupti fugit. Esse aut, inventore accusamus sequi distinctio ratione dignissimos odit. Ab quidem a eos tempora! Expedita sequi rem incidunt delectus placeat, alias a. Ab non esse enim animi suscipit accusantium numquam incidunt accusamus, veritatis, quos ea, vel nemo aliquid unde. Atque mollitia qui iste suscipit voluptatum. Assumenda sit asperiores esse, minus saepe officia excepturi facere odio sunt. Modi asperiores animi voluptate atque necessitatibus eius impedit id voluptatum iste, aliquid nam fugit ipsam iure eveniet ipsum voluptatibus suscipit. Quod labore dolores eos esse explicabo debitis ipsa sunt, sed optio qui expedita atque facilis. Quidem laudantium dignissimos dolores quas maxime, facilis obcaecati similique temporibus. Corporis quod consequatur quasi velit nesciunt ad magni recusandae quidem? Mollitia in laudantium vero expedita dolor nam modi dolorem saepe fugit eius quo iure quibusdam nulla, nesciunt, consequuntur sunt itaque maxime esse et quia magnam praesentium. Debitis atque, deleniti pariatur modi id optio esse cupiditate possimus quia, ea sed totam ad sint mollitia architecto, facilis maiores reiciendis. Obcaecati sed, vitae eius atque neque sunt earum assumenda exercitationem nostrum quasi nobis totam dignissimos delectus. Voluptatum iusto in fugit nobis odit dolor, natus dolorum incidunt, suscipit beatae veniam sequi nisi commodi eos quidem delectus. Eveniet est, a, deserunt ea quidem veniam. Recusandae, quo hic! Cumque debitis velit vitae, vero earum saepe incidunt, aliquid deleniti delectus, ea itaque autem ipsa eius aliquam fugiat officia consectetur. Repellendus, labore aspernatur libero nesciunt reiciendis inventore non ex. Repellendus laboriosam, repudiandae maiores cupiditate quos accusantium quaerat, dolores repellat. Ullam, asperiores at, consequuntur repellendus exercitationem aperiam quod laboriosam eaque dolores optio recusandae cum aliquid, dolorem fuga, quibusdam architecto dolore excepturi est in. Eligendi voluptatem animi architecto, libero adipisci iste odit non minus expedita optio, voluptates voluptas incidunt ducimus magni dignissimos vero autem veniam saepe placeat ipsam eaque. Dolore rerum dicta nulla quis nihil ipsum dolorem nemo! Asperiores eligendi hic natus quod. Est saepe numquam, quod tenetur iusto molestiae voluptatum laudantium quo quas alias aliquid aut excepturi cum temporibus eaque quia amet molestias perferendis vitae ipsa incidunt. Eius nostrum quasi perspiciatis labore ea libero praesentium ullam porro officia nihil ducimus accusamus officiis impedit culpa commodi molestiae, perferendis, adipisci maxime sapiente odit reprehenderit quis. Maiores doloremque, adipisci earum sunt repellendus dicta id soluta tempore rem quasi. Aspernatur error quam mollitia dolore deserunt aliquam neque praesentium quisquam iusto sed veritatis in aperiam dicta architecto obcaecati delectus at reiciendis tempore, est! Similique, libero minus amet sed nostrum explicabo hic blanditiis labore tenetur, nemo veritatis veniam sapiente, sequi iure obcaecati ad quos aperiam facilis architecto ullam eligendi non voluptas perferendis. Dolorem, ratione enim aliquid cum iusto sunt.
        </div>
      </div>
    );
  }
}

export default Test;
