#include "eosauth.hpp"

using namespace eosio;

/**
 * @brief Create resource access reqest
 */
void eosauth::requestpm(
  const account_name& requester,
  const account_name& approver,
  const string& publicKey,
  const string& resourcePath
) {
   // requester must be the account that sign this action
   require_auth(requester);

   // requester must not be the account who approve the request
   eosio_assert(requester != approver, "requester shouldn't be the same as approver");

   // instantiate table storing requests
   requests existing_request(_self, requester);

   // create a new request in the table
   existing_request.emplace(requester, [&]( auto& req ) {
     req.requestId = existing_request.available_primary_key();
     req.requester = requester;
     req.approver = approver;
     req.publicKey = publicKey;
     req.resourcePath = resourcePath;
     req.isApproved = false;
   });

   // transfer AUT token to eosauth contract
   action(
        permission_level{ N(requester), N(active) },
        N(eosio.token), N(transfer),
        std::make_tuple(N(requester), _self, "1.0000 AUT", std::string("ddd"))
   ).send();
}

/**
 * @brief Approve resource access request
 */
void eosauth::approve(
    uint64_t requestId,
    const account_name& requester,
    const account_name& approver
) {
  // approver must be the account that sign this action
  require_auth(approver);

  // instantiate table storing requests
  requests existing_request(_self, requester);

  // get existing request with request id
  auto itr = existing_request.find( requestId );

  // check if request exists
  eosio_assert(itr != existing_request.end(), "request doesn't exists");

  // make sure approver is able to approve this request
  eosio_assert(approver == itr->approver , "It is not your data!");

  // make sure the request has not been approved
  eosio_assert(!itr->isApproved, "the request has been approved!");

  // approve the request
  existing_request.modify(itr, itr->requester, [&]( auto& g ) {
    g.isApproved = true;
  });

  // transfer money from contract to data owner which is the approver
  action(
      permission_level{ _self, N(active) },
      N(eosio.token), N(transfer),
      std::make_tuple(_self, N(requester), "1.0000 AUT", std::string(""))
  ).send();
}

EOSIO_ABI( eosauth, (requestpm)(approve) )
