<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMasterClassRequest;
use App\Http\Requests\UpdateMasterClassRequest;
use App\Models\MasterClass;

class MasterClassController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMasterClassRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMasterClassRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MasterClass  $masterClass
     * @return \Illuminate\Http\Response
     */
    public function show(MasterClass $masterClass)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MasterClass  $masterClass
     * @return \Illuminate\Http\Response
     */
    public function edit(MasterClass $masterClass)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMasterClassRequest  $request
     * @param  \App\Models\MasterClass  $masterClass
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMasterClassRequest $request, MasterClass $masterClass)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MasterClass  $masterClass
     * @return \Illuminate\Http\Response
     */
    public function destroy(MasterClass $masterClass)
    {
        //
    }
}
