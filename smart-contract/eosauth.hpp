#include <eosiolib/eosio.hpp>

using namespace std;

class eosauth : public eosio::contract {
   public:
      eosauth( account_name self ) : contract(self){}
      /**
       * @brief Information related to a approval
       * @abi table approvals i64
       */
      struct request {
         uint64_t             requestId;
         account_name         requester;
         account_name         approver;
         string               publicKey;
         string               resourcePath;
         bool                 isApproved;

         auto primary_key() const { return requestId; }
         EOSLIB_SERIALIZE( request, (requestId)(requester)(approver)(publicKey)(resourcePath)(isApproved))
      };

      /**
       * @brief The table definition, used to store existing requests
       */
      typedef eosio::multi_index< N(requests), request> requests;

      /// @abi action
      /// Create a new resource access request
      /// TODO: return requestion id
      void requestpm(
        const account_name& requester,
        const account_name& approver,
        const string& publicKey,
        const string& resourcePath
      );

      /// @abi action
      /// approve a esource access request
      void approve(
        uint64_t requestId,
        const account_name& requester,
        const account_name& approver
      );
};
