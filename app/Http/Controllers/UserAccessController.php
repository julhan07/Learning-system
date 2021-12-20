<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserAccessRequest;
use App\Http\Requests\UpdateUserAccessRequest;
use App\Models\UserAccess;

class UserAccessController extends Controller
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
     * @param  \App\Http\Requests\StoreUserAccessRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserAccessRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserAccess  $userAccess
     * @return \Illuminate\Http\Response
     */
    public function show(UserAccess $userAccess)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UserAccess  $userAccess
     * @return \Illuminate\Http\Response
     */
    public function edit(UserAccess $userAccess)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserAccessRequest  $request
     * @param  \App\Models\UserAccess  $userAccess
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserAccessRequest $request, UserAccess $userAccess)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserAccess  $userAccess
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserAccess $userAccess)
    {
        //
    }
}
