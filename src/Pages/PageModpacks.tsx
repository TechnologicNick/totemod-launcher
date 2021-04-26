import React from 'react';
import path from 'path';
import halfmoon from 'halfmoon';
import { useForm } from 'react-hook-form';
import { PathHelper, WorkshopModManager } from 'scrap-mechanic-common';
import { Core, ModpackManager } from 'totemod-core';
import './PageModpacks.global.scss';
import ModpackCard from '../Components/ModpackCard';

const toggleAddModpack = (e: React.MouseEvent) => {
    e.preventDefault();
    halfmoon.toggleModal("modal-add-modpack");
}

interface IFormNewModpackInput {
    name: string,
    description: string
}

export default function PageModpacks() {
    const { register, handleSubmit } = useForm<IFormNewModpackInput>();
    const onSubmitNewModpack = (data: IFormNewModpackInput) => {
        console.log(data);

        ModpackManager.createModpack(data.name, data.description);
    }

    // TODO: Do this somewhere else
    if (!PathHelper.USER_DIR) PathHelper.findUserDir();
    if (!Core.isInitialised()) Core.setModpacksDirectory(path.join(PathHelper.USER_DIR, "Modpacks"));

    if (Object.keys(ModpackManager.modpacks).length === 0) ModpackManager.reloadModpacks();

    return (
        <>
            <div className="content">
                <div className="clearfix">
                    <h2 className="float-left d-block-inline content-title">
                        Installed modpacks
                    </h2>
                    {/* <Link to="#modal-add-modpack" className="float-right d-block-inline btn btn-square btn-primary rounded-circle">+</Link> */}
                    <button onClick={ toggleAddModpack } className="float-right d-block-inline btn btn-square btn-primary rounded-circle"><span className="center-font-vertically">+</span></button>
                </div>
                
                <div className="border-top" style={{ paddingBlock: "var(--content-and-card-spacing)", display: "grid", counterReset: "grid-items", columnGap: "var(--content-and-card-spacing)", rowGap: "var(--content-and-card-spacing)", gridTemplateColumns: "repeat(auto-fill, minmax(30rem, 1fr))" }}>
                    {Object.values(ModpackManager.modpacks).map(modpack => <ModpackCard key={modpack.config.localId} modpack={modpack}/>)}
                </div>
            </div>

            <div className="modal" id={`modal-add-modpack`} tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <a href="#" onClick={ toggleAddModpack } className="close" role="button" aria-label="Close" style={{ left: "calc(1rem + var(--sidebar-width))" }}>
                            <span className="center-font-vertically">&times;</span>
                        </a>
                        <h5 className="modal-title">Create new modpack</h5>
                        <form onSubmit={ handleSubmit(onSubmitNewModpack) }>
                            <div className="form-group">
                                <label htmlFor="name" className="required">Name</label>
                                <input type="text" {...register("name")} className="form-control" placeholder="My Cool Modpack" required={true} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description" className="required">Description</label>
                                <textarea {...register("description")} className="form-control" placeholder="The description of your modpack" defaultValue="This mod doesn't have a description" required={true}></textarea>
                            </div>
                            <input className="btn btn-primary btn-block" type="submit" value="Create" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
